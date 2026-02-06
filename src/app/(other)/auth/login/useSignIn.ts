import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import { BASE_URL } from '@/types/validationSchema';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resolvedUserType = useMemo<'admin' | 'store' | 'delivery'>(() => {
    const loginTypeParam = searchParams.get('loginType')?.toLowerCase();

    if (loginTypeParam === 'delivery') return 'delivery';
    if (loginTypeParam === 'store') return 'store';

    return 'admin';
  }, [searchParams]);

  const [userType, setUserType] = useState<'admin' | 'store' | 'delivery'>(resolvedUserType);
  const { saveSession } = useAuthContext();
  const { showNotification } = useNotificationContext();

  const loginFormSchema = yup.object({
    mobile: yup.string().required('Please enter your mobile number'),
    password: yup.string().required('Please enter your password')
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { mobile: '', password: '' }
  });
  const redirectUser = (role: string) => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) {
      navigate(redirectLink);
    } else if (role === 'ADMIN') {
      navigate('/dashboard/ecommerce');
    } else if (role === 'DELIVERY') {
      navigate('/app/ecommerce/order-list-delivery');
    } else {
      navigate('/apps/ecommerce/orders/rxorder/rxorderlist');
    }
  };

  useEffect(() => {
    setUserType((prevUserType) => (prevUserType === resolvedUserType ? prevUserType : resolvedUserType));
  }, [resolvedUserType]);

  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const endpoint =
        userType === 'admin' ? 'storeusers/admin/login' : userType === 'delivery' ? 'delivery-auth/login' : 'storeusers/login';

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const { token, expirationTime, user, admin } = data.result;

      const unifiedUser = {
        id: user?.id || admin?.id,
        name: user?.name || admin?.name,
        username: user?.username || admin?.username || '',
        mobile: user?.mobile || admin?.mobile || '',
        email: user?.email || admin?.email || '',
        password: user?.password || admin?.password || '',
        firstName: user?.firstName || admin?.firstName || '',
        lastName: user?.lastName || admin?.lastName || '',
        role: user?.role || admin?.role,
        storeId: user?.storeId || admin?.storeId,
        token,
        expirationTime
      };

      saveSession(unifiedUser as any);

      showNotification({
        message: 'Login successful! Redirecting...',
        variant: 'success'
      });

      redirectUser(unifiedUser.role);
    } catch (error: any) {
      let message = 'Login failed. Please try again.';
      if (error?.message?.includes('Cannot POST /v1/admin/login')) {
        message = 'Login failed. Please check your role and try again.';
      }
      showNotification({ message, variant: 'danger' });
    } finally {
      setLoading(false);
    }
  });

  return { loading, login, control, userType, setUserType };
};

export default useSignIn;
