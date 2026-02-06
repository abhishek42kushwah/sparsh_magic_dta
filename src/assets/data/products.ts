import type { WalletType, CrmCallerListType, RxOrderCrmType,  masterCategoryType } from '@/types/data';

import type { LeadType } from '@/types/data';

import type { CouponType, CustomerType, HomeBannerType, OrderType, ProductType, SettingsType } from '@/types/data';
import product1 from '@/assets/images/products/01.png';
import product2 from '@/assets/images/products/02.png';
import product3 from '@/assets/images/products/03.png';
import product4 from '@/assets/images/products/04.png';
import product5 from '@/assets/images/products/05.png';
import product6 from '@/assets/images/products/06.png';

import avatar1 from '@/assets/images/users/avatar-1.jpg';
import avatar10 from '@/assets/images/users/avatar-10.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar5 from '@/assets/images/users/avatar-5.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import avatar9 from '@/assets/images/users/avatar-9.jpg';
import { addOrSubtractDaysFromDate } from '@/utils/date';

export const products: ProductType[] = [
  {
    id: '1001',
    name: 'Apple Watch',
    description: 'Size-05 (Model 2021)',
    image: product4,
    category: 'Sports',
    pics: 32,
    price: 70,
    sellPrice: 50,
    sellsCount: 450,
    status: 'In Stock',
    createdAt: addOrSubtractDaysFromDate(0),
    paymentType: 'UPI',
    DisplayName: '',
    thumbnail: '',
    metaDes: '',
    masterCat: '',
    BuyPrice: 0,
    brand: '',
    stock: false,
    sku: '',
    packagingType: '',
    drug: '',
    hsnCode: '',
    igst: ''
  },

  {
    id: '1002',
    name: 'Apple Watch',
    description: 'Size-05 (Model 2021)',
    image: product4,
    category: 'Sports',
    pics: 32,
    price: 70,
    sellPrice: 50,
    sellsCount: 450,
    status: 'In Stock',
    createdAt: addOrSubtractDaysFromDate(0),
    paymentType: 'UPI',
    DisplayName: '',
    thumbnail: '',
    metaDes: '',
    masterCat: '',
    BuyPrice: 0,
    brand: '',
    stock: false,
    sku: '',
    packagingType: '',
    drug: '',
    hsnCode: '',
    igst: ''
  }
];
// export const orderList: OrderListType[] = [
//   {
//     id: '1001',
//     orderId: 'ORD001',
//     productName: 'Apple Watch',
//     itemBuyPrice: 60,
//     itemSellPriceCopy: 50,
//     name: 'Apple Watch',
//     description: 'Size-05 (Model 2021)',
//     image: product4,
//     category: 'Sports',
//     pics: 32,
//     price: 70,
//     sellPrice: 50,
//     sellsCount: 450,
//     status: 'In Stock',
//     createdAt: addOrSubtractDaysFromDate(0),
//     paymentType: 'UPI',
//     quantity: 0,
//     productImg: '',
//     total: 0
//   }
// ];
export const masterCategorys: masterCategoryType[] = [
  {
    id: '1001',
    name: 'Apple Watch',
    image: product4,
    createdAt: addOrSubtractDaysFromDate(0)
  },
  {
    id: '1002',
    name: 'Morden Chair',
    image: product1,
    createdAt: addOrSubtractDaysFromDate(12)
  },
  {
    id: '1003',
    name: 'Reebok Shoes',
    image: product5,
    createdAt: addOrSubtractDaysFromDate(30)
  },
  {
    id: '1004',
    name: 'Cosco Vollyboll',
    image: product6,
    createdAt: addOrSubtractDaysFromDate(45)
  },
  {
    id: '1005',
    name: 'Royal Purse',
    image: product4,
    createdAt: addOrSubtractDaysFromDate(16)
  },
  {
    id: '1006',
    name: 'New Morden Chair',
    image: product3,
    createdAt: addOrSubtractDaysFromDate(3)
  },
  {
    id: '1007',
    name: 'Important Chair',
    image: product2,
    createdAt: addOrSubtractDaysFromDate(40)
  },
  {
    id: '1008',
    name: 'Nivya Footboll',
    image: product2,
    createdAt: addOrSubtractDaysFromDate(20)
  },
  {
    id: '1009',
    name: 'Green Morden Chair',
    image: product1,
    createdAt: addOrSubtractDaysFromDate(90)
  },
  {
    id: '1010',
    name: 'Bata Shoes',
    image: product1,
    createdAt: addOrSubtractDaysFromDate(0)
  },
  {
    id: '1011',
    name: 'Cosco Vollyboll',
    image: product6,
    createdAt: addOrSubtractDaysFromDate(20)
  },
  {
    id: '1012',
    name: 'Royal Purse',
    image: product4,
    createdAt: addOrSubtractDaysFromDate(18)
  },
  {
    id: '1013',
    name: 'New Morden Chair',
    image: product3,
    createdAt: addOrSubtractDaysFromDate(5)
  }
];
export const ordersData: OrderType[] = [
  {
    id: '5001',
    productId: '1001',
    quantity: 3,
    total: 150
  },
  {
    id: '5002',
    productId: '1002',
    quantity: 1,
    total: 99
  },
  {
    id: '5003',
    productId: '1003',
    quantity: 4,
    total: 196
  },
  {
    id: '5004',
    productId: '1004',
    quantity: 10,
    total: 1000
  },
  {
    id: '5005',
    productId: '1005',
    quantity: 2,
    total: 118
  }
];

export const customers: CustomerType[] = [
  {
    id: '2001',
    name: 'Andy Timmons',
    avatar: avatar2,
    email: 'dummy@dummy.com',
    order: 75,
    spend: 280,
    status: 'New',
    city: 'Curicó',
    startDate: new Date('2005/02/11'),
    completion: 37
  },
  {
    id: '2002',
    name: 'Jeff Beck',
    avatar: avatar3,
    email: 'fake@dummy.com',
    order: 65,
    spend: 150,
    status: 'Inactive',
    city: '	Dhanbad',
    startDate: new Date('1999/04/07'),
    completion: 97
  },
  {
    id: '2003',
    name: 'Vince Nelson',
    avatar: avatar4,
    email: 'exemple@dummy.com',
    order: 32,
    spend: 39,
    status: 'Repeat',
    city: '	Norman',
    startDate: new Date('2005/09/08'),
    completion: 63
  },
  {
    id: '2004',
    name: 'David Gilmour',
    avatar: avatar5,
    email: 'only@dummy.com',
    order: 40,
    spend: 170,
    status: 'Inactive',
    city: 'Amqui',
    startDate: new Date('2009/05/11'),
    completion: 30
  },
  {
    id: '2005',
    name: 'Dianna Smiley',
    avatar: avatar6,
    email: 'dummy@exemple.com',
    order: 80,
    spend: 220,
    status: 'New',
    city: 'Kempten',
    startDate: new Date('2006/11/09'),
    completion: 17
  },
  {
    id: '2006',
    name: 'Adolfo Hess',
    avatar: avatar7,
    email: 'dummy2dummay@dummy.com',
    order: 45,
    spend: 120,
    status: 'New',
    city: 'Enines',
    startDate: new Date('2006/03/08'),
    completion: 57
  },
  {
    id: '2007',
    name: 'James Ahern',
    avatar: avatar8,
    email: 'dummy10@dummy.com',
    order: 88,
    spend: 580,
    status: 'Repeat',
    city: 'Neath',
    startDate: new Date('2014/03/12'),
    completion: 93
  },
  {
    id: '2008',
    name: 'Simon Young',
    avatar: avatar9,
    email: 'totaldummy@dummy.com',
    order: 124,
    spend: 380,
    status: 'Inactive',
    city: 'Cobourg',
    startDate: new Date('2014/10/08'),
    completion: 100
  },
  {
    id: '2009',
    name: 'Robert Lewis',
    avatar: avatar10,
    email: 'Exemple@dummy.com',
    order: 84,
    spend: 254,
    status: 'Inactive',
    city: 'Eberswalde-Finow',
    startDate: new Date('2014/02/08'),
    completion: 44
  },
  {
    id: '2010',
    name: 'Erik Brim',
    avatar: avatar1,
    email: 'onlyfake@dummy.com',
    order: 62,
    spend: 225,
    status: 'New',
    city: '	Moircy',
    startDate: new Date('2000/11/01'),
    completion: 33
  },
  {
    id: '2011',
    name: 'Kevin Powers',
    avatar: avatar5,
    email: 'exemple@exe.com',
    order: 54,
    spend: 345,
    status: 'Repeat',
    city: '	Cobourg',
    startDate: new Date('2014/12/08'),
    completion: 100
  },
  {
    id: '2012',
    name: 'Wendy Keen',
    avatar: avatar3,
    email: 'Exemple@dummy.com',
    order: 32,
    spend: 39,
    status: 'New',
    city: '	Cobourg',
    startDate: new Date('2014/11/08'),
    completion: 100
  },
  {
    id: '2013',
    name: 'Wendy Keen',
    avatar: avatar1,
    email: 'Exemple@dummy.com',
    order: 32,
    spend: 39,
    status: 'New',
    city: '	Cobourg',
    startDate: new Date('2014/03/11'),
    completion: 100
  }
];
export const bannerData: HomeBannerType[] = [
  {
    id: 3,
    img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFRUVFxUWFhcYFRgVGhcWFxcXFhUWFhYYHyggGRolHRUVITIhJisrLy4uFx8zODUtNygtLysBCgoKDg0OGxAQGjUlHyUrNS4tKy4tMzItLS0tMC8tLysrLS41Ly0rLS8tLS0wLS0tLS0tNS0tLS0vLS0tLS0tLf/AABEIALwBDAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EAEkQAAEDAQQGBQcICAYCAwAAAAEAAhEDBBIhMQUGEyJBUVJhcZGSFDJTgaHR0gcXIzNCYrGyFiRjcrPB4fAVNEOCk/FUcyU1wv/EABoBAQADAQEBAAAAAAAAAAAAAAABAwQCBQb/xAAyEQACAQIEBAIJBAMAAAAAAAAAAQIDEQQSIVETMUFxBZEiMkJSYaHB4fAUgdHxM3Kx/9oADAMBAAIRAxEAPwD7iiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgOex22lVbepVGVG5SxwcJ5GMiuhcFt0PQquvvpi/ECo2WVAOQqsh49RXOdH2hn1NpLh0K7BUEcm1GFrx2uL0BLoof/Fa1P6+zPA4voHyhvhAFWeoMPaoyvr5ZhUfTa19Qs867dw3Q6HNcQ5pxiCBiuZSUVdllOlOo8sFdlrRU8/KBR9BX7mfEvPzh0PQV+5nxKvj09zS/DsSvYZckVMPyi0PQWjws+JeT8pFD0Fo8LPiXXFhucPBV1ziy6oqR85Vn/8AHtPhZ8SwflMs/oLT4WfEus8dyt4equcS8IqN851m9BaPCz4lg/KfZvQWjws+JTdHDpyXQvSKi/OfZvQWjws+JPnQs3oLR4WfEpOWmi9IqJ86Fm9BaPCz4k+dGzegtHhZ8SnKzhySL2iog+VCzegtPgb8Sx86Vm9BaPCz4l1klscurBdS+IqH86Vm9BaPCz4k+dKzegtHhZ8SnhT2Of1FPcviKh/OlZvQWjws+JPnSsvoLR4WfEp4M9iP1NLcviKh/OlZfQWjws+JdFn+UazvEijXHDFrfiTgVNiHi6K5yLoiqA1/oeireFvxLHzg0PQ1/C34l0sNVfsnKxtB+0XBFUma+USYFGvPK634lvfrlTGBo1geRa0EdoJkI8NVXsnSxdF+0WZFWv0ypeiq9zfetzNaqREhlThwHEgcDnjkuXRqJXaOo16cnZMn0UHZ9arNUE0XOruxF2i01bpzh7m7lMxB3yMwtorWyp5tOnZxwNU7Z/YaVMho7doexVFxLqPtWnbLTdcqWmgxwza6qxpHqJlaf8DD/r6tWt90u2bOw06QaHN6n3lIWWy06bQymxrGDJrGhrR2AYBAbkREAXyXXSpd0hWAMBwp3uExRkT3DuX1pfIdexOkKvYz+CsuL9Rdz1vB0nXd/d+qIVwXVovQ9a0FwosvFsF281sAzHnEcio4vIwV1+TVwd5UL12abMeXn4+rNebQhmmkz6fHV+FQlOK1VufdIiKmptuAnYH1Ppn2XlAVmFpLXAtLSQ4GQQRmCF9F1a0ZdtDHDSba8XvomvJL90iINQ4DPLgoax2M2vSr79Msa15fUYcw2ndADow3iG95iVr4Wit1f5yPIWLbcs1mkr3Sa/azK/pTQVos7GvrUyxr8Gm804xMEAkgxOfJeNFaDtFpDjQpl9yL2+1sTMecRORX0Ks2tbqVtoVKVRkPv2YvY5ghohoBI4lkn/2lQuoFodSstvqN86mwPEj7TWVCAR2hXqCT+BhliJOm20syt21KZY9H1atUUGMJqEuF0kNxaCXA3iAIunuXRY9XbVVqVKVOmXPomKgvtF0yRmXQfNOSvdmsjKlvsekKI+jtG0Dx0Koo1JB7YI7WnmmrFQttelXDNpJHaHVSFbGJlqVX02+dz5zR0fVdW8nDXbW8WXC4DeEyJJjgeKzV0XXFY2bZuNYEC403jMB2bTGRmeCvzKLbRaLDpKkIFR7WV2j7FUNLQT2+b4OalNBUG+X6SqyA5uyaHHJoNO84nqlrfCromSbuUJuo2kT/AKB/5afxri0Xq1a7Q1zqNMvDHFjvpGthwAJG84cwrI/QocS52nKRJxJ2hz/5V2alWYv0ba6bawpk1nAVS4tA3aW9eBkT/NWqVkZpRuyuP1W0hQa57rO4tAJMPY4iARN1riTgTwKrIf1nvK+s6vWJ9hFS12m3CrQuXYD31GlxcIIJJ3sC0AdJfKqzgXOIEAkkDkCZAV9J3bMldWSNd7rPeVm/1nvKQi1xR58jN/rPeVkVDzPeVhZXZw2bKN5xDQTJwzKsFJt0ACcOv2ri0PZ4F88cB2cSpWz0C9waOPsHEq6CSVzBiJOUlFHuy0CROOOAx4cT/LvVn1f0JSIv1N49GeHXC1U7GAABkMAvG0deLb27jgMJ6jz/ALxVFao3G0XY9TB4dQd5K9izVrfZaUFxY2MBDZugdgwifxWdJ6LZaGBzYvQC1wxBGYxGYx9qpGmBs6B3b20vUzzAdTqPBkyTFzI81zal6brUqzKN6aT3OvNOMbrnS3omR2GT6sPClH0ovVHq54yVpLQlq9lLHFrhiM8V5L9m1zhnGHbII9qsVrqMqnLLM8VyaSs9IseSIN05Kx101lkihYdqWaL7E3qqwCy07oAG9gMPtuUuovVkfqzO1/53KUWCXNm+PqoIiKDoIiIAvkOvB/8AkavYz+Cvry+Qa8//AGNXsZ/AWXF+ou563g3+d/6/VEHUbKk9VtK0rMa21vRUa1ouielPZ5yiyV2WBjHMqscWNc5rdm5+ABFRpdvQYJbK82lJxldH1OMpxqUmpfDl3JfReltGWeo2q1toc9k3QYzILeY4E5rbR1vptba6zQ5tptDhcwBDGNAazeOZAvHLOFxNFmBbeNA0/wBXDBdF8PDmbc1DdktgVZkkEEQtFK12UiYYHlmBcKTSHbQ3w4bI0xu3YN2SCcZW6L2seBUgr3kpPu+nO3a/M6dE66WplZjq1Z76QO+2GYtIIMQBiJn1LrZrFZGeXhl+7amm4LkQ5zHhwOOAvOn19S4bBbLIDRc/ZE05DgWgh+1quaS+AAbjBey+02Fyav22zNona3L4NYiWMe6Ni0MgPEHfmAcJVkW+rM9VQd2o2/s7tR9am2S/TrBxpO32wJLamRgHgR+A5lbNEaz0KVe31HX7tpnZw2Tiah3hOHnBeLHbrJUnClQF4S9zaBe4CmwF2xdScIvBzoYWyXHtWvRzrI1zHvdQLXNsTbpElrmBnlBe0jdBuuk/avcZVsTLUSu3Y06i6zNsb3Nqgmi+CQBJbUbF1wHs9TeS6aGuLaVvr2hrC+hXuhzDAcQGgAgHCRvYZEFcOm6ll8nijcvuqtrGBvNFRtW9RnosikIykquOV0TLU3Lc5+gzjctTZ+yIgdWZ/Erl0bpyjT0farKb9+rULqe7IuxTAvGcDulVoryVfGJjnKxZ9UdYKVGnWs1pDnWes04NElr8ASBwkQZ4FoVZqAAkNMgEwSIJE4EjhI4Lyi0QjZ3MVSTasERFpiY5GVvstAvcG9/UOK0Kd0TZrrbxzd7Bw967SKZuyOwNAwGQyVn1d0ddZtCMX5dTeHfn3KJ0Jo/b1Q37I3nnq5evLv5K8loHJcV6uVZUTgcNmlxH+xyCioSrgT+878VPVLQOCqNaq4udPSd+Kzxnc9XJY9a11opMiSb4iJn6mvkq7oCqX2mlhjeOWRlrhiOHaP6qV1kYTSH/ALG8vQ1lxaqAi10bwxv8cDkc+frxU9GWIv8ATsDhi4QtWkGfRv8A3VN1qpIhRlvZuP7CqFJ21JcddCZ1c+ob2v8AzuUmo3V/6kfvP/MVJLK+ZrjyQREUEhERAF8h13Y7/Ea0AnBmQn/QX15UPWDQ9SpbHvbdg3Ikkf6ZHLqVGIg5Rsjf4dWjSquUtvqiguou6Lu4rGxf0XeEq8nViv8Ac8R9yfoxX50/EfcvPWGlsfRS8UpW5rzKKaD+g7wlaalid0HeE+5fQW6s2jnT8R9y2jVa0c6fiPuV0aEkZaniFOXVHy+pZKg+w7wlajQf0XeEr6sdUrR+z8R9y56upVoOWz8R+FXxpswVMTB8mfMNk/ou8JQMqdB3hK+jP1LtQ9H4j7lpOqlo+54j7lcoGOdZMoIY/oO8JWSx3Qd4Sr4dVrR+z8R9yx+i1o/Z+I+5XxSMk5t9Ch7N/Qd4Smxf0HeEq+fotaOdPxH3J+ito50/EfcroyjuZJqT6FC2L+g7wlNk7oO8JV8/RW086fiPuWP0UtPOn4j7lcqkdzJOnU90oZpu6DvCU2bug7wlXs6p2nnT8R9y8/olaf2fiPwq6NWG5mlRq+6yoaNsNSo+BTeQMXQxxw4DAcferC6z1vQ1f+N3uV31d0X5PSumC9xl5GU8AOoD8Smnrfs2QCQ5wMEDzQ2Jce8D1zwlUTxmVu3I0R8OzwTm7PY59B2M0qQB8928/t4N9Q9sruc0qv2G1VKz6VJ917XF5JLYO4L7CBhmOY4rq0VbgGU6BvB5F0OwdvEnF17+uapk5SdzbCEIRUUSjKJKgDYwL7nEAX34kwM+5WjQVuvufSdBcxzseYDsMAIyu8eKh6tJoe910B1929Anzjxj+amDdyZJERrQ1ps4ukEbQY8PqK2TslCasOItVnByviOOH3Ty7MFYdbjNDP8A1B/BrKs6qhwtNDkarJxkE3uYwJV6fos4tqfWS1c2kaY2bo6JXeKa5tIM+jf2FZMxdlOvQP1X+5/5ipFR+g/qz++/8xUgqmWhERAEREAUHa/8wf8Ab+V6nFB2v/MHtb+V6A60WYWEBgv617bWExOPJVXWEUzVa3ZODtxz6wpveWhpkNploO8eeQniuQUH+UXgx17ykujZum4ZF418rkY3PUqZVbO1jbDCKUczlbS/L8/O5fKdcZLeHKg6IoltShFN7arDU8oeWkBwIObzg+TdIiYXXpSvXv2hzH1W7OnTdTDZuufvSIjeyGA59ilVHa9vzmQ8Ks+VS6fW3x79i5OcBiTCw6kDwVUa2q41aJeXNu0nNdVZtIc68Kl3ITl2SpttocymxtNrHFoDYLnMEARgYceAz710pN9CmdJR0Urv7XOirZWjEmO1aTZmxIcI5yF50naaZpHaNvDCWhm1g8DdjEA4+pVancZZ7rrPtDtHik40XgEOAvVX04JbnAEcBELmdTKyyjh1Uje/WxaXWSOIxyWDY3KsVaDbrgWVKs0KbLM803S17bwOY+jN6DjGCn9J7Qts7A9wJqMbUcw4xcdek8BMYoqt76Ezwqi0s3P+L/bub/JHLDbMTlj2KJsprBzCalV36y+iWuxaaIDoc4RjkN7rUzoex7EODnMJc68bjbgyAAuyQAAAMOXE4qYzcuhxVoKmvWuZbYivQsJXaazeYWNs3mFYZzkqWdrGlznANaCSTkABJJXze0jyquaxeA3GKROIYGubwkTkS3rdMQrVrtpAlrLOwOIqOF9zTF0Ztg85APYOtQVr1euXdjUc4gk790Q0AADCBIkwY44zxoq6u3yBu1caG1qQEAAVchAxa6fbKjrNUHldH98cukfWunQtitNKsHVIc1rCL18Eg7OMZzxLsuY5KEZVqMtVIuY4NFVoDoMEEtxmMcXQvQjNPyM7iy86tOG3rc5dz4kf1XFbK7QXklo33ZkDievPBQej9JRanDOS+cJ6Hxf2UtNtcDVbEiXnARBxdie38VS5tZiWtEbNZfNLTkSwHCcAyvjET9r+5Vc1TaRa6MekZMGcA4HEDEeuFL6QtBe5gBBa+DnMQ1w4RMl4Of8AWP1aoU2Wlji4l1NwvHh5w+yRKqo4pZW9yGtT6NV00KYecXAYyILReJa0YGTi0yI5r0NJtqUqt6G3AATMAl3KcscM1B2yp+rnKS1oPHea8z1zmt1DCz2o+vuqvhdQnGUMxbfUtmgng0iQQQXvggyDvHipFQGo5/U2cMX4ct44KfS99TsIiIAiIgCg7X/mPD+V6nFCWz/MeH8r0B1rC9gLntdnDhO9gD5pgnIx7AgOWtQrHKoG+oH7RPLlA9S1soVhnUBwIi7x4Gf5LFChiDs6syDi8wMspzyy/wCh5FjiRcr8Z3hkZMDvHXh3952V8NXvd+Z5FnrjOqDgPsgdpiOxNjWhv0gkXpMATJkACDGGE/ivbrFMHZ1cMBvDKcZnj/eYC81LBuNAp1iDB87GMRBz4GfXjxTO/wAQ4a+Pmzw+jXIgVADzugzvTMRygerjOG3Z1L0392ZiBlAwmOco+wT51OtLhJh3mk4XRGWXt7Vk2GQBs60DKHCcTMc85x6xjxEZ2Tw18fM0bG0elbw+zHGTjjGGHtW1zKkCH9KThjOXDCMvb1HJ0aM9nVxGQdgAcIgjkO3HqCyNHDEXK+fB2Zk4kxgI/uVOdkcNbvzOd1K0cKo8I5Hqx4LY5lWfrOOWGUg9HAxIW+rotpI3Ksx0sGwwtEGM8/8AqJ8iwNz2Vc9RI4QePOPb6gzscNbvzZodTrZCqO0gTN2Jy6WK6qRcGi8ZIGJ5niVr/wAOGE06zsXOxdkbzboMDHzAf93aRsboptQhrmVmi6WzeAGAAxAGfq96hyudRgkery59I29lGm6q87rR6ySYa0dZJAHWVPGxtXzv5UbUy5TotMRXoF2eN2o15gjO6ACRjn1KuU1FXO0m+RFaRq2sg1H3SC9rmFvSvC6HThAECcPfJWCrbm1WCuabmFjpIutM3jyiRd2WQzJXDYqrSw3Tg5+7daHYuJMloPZkIB4nhKaZ0kabmBozZIGRMlvnFzTdG6eyDxIWWFdW9IizWjOt1Zt5oAYbxgkEYdvNLSwtaSxpnOL7mDvEx3LDLVSc28HMBZ55LMGnDrw9pynrjrbpOmcBWa7AOgBzZGGIJP3hI4rvjQfIlIrNi07VZVDXBlQNpOFx7xiTUaYLjPA4cTEKxBrKgcboa5puEiGtcbvEnAYGPURiqyKDRV3mN+reJI5HAhpnINbj+OBUtYbewNFMkmHOk4yQ5pBAEQRdwgjG6DyK6ryWXmcKNyKqte4scYhzHndgARdJ4nIGIyxGGa2aDs4bde6QbzKf2mkXngNk4AZ5zlAXmhaG3KbRvFrKjjE4C7lzEmlxwwJBK1Co59Ngaxzi99NuWd2Xw53HCmc8RzMYc2eTKuRy46lz0m4MowXRnB4mCXEXRm6cRGaWW30zTq07wJqU3XQMRMuMHlgHZ9eGKhn6WZVOw2YmDIJD53HF0ZTiTzwEwpCxW2hvMEEGnVDHAAtBF2YcDhgXg9h4YlSyxjlb1ZZlZddR3E2OmTzf+d0KeUFqSP1Oll9rLneMhTq0R0SAREUgIiIAoW2/Xj1fg9dlt0xQpG6+o2/EimJfUI+7SZL3eoKAq6UdUrmLPXY0RD304DyYgMaCXNAD3El4b5sdkN2BPtXoLhJd0j4SvMP6TvCVIOqvZA8zee0xG66PZlK8UrBEfS1CZJ87POBBnASue4/m7uWNjU5v7kB1U9HNERVq4feGM5k4LYywtAjaVMgJv4mCDPKcIw4SuDyepzd3D3p5LV+97PegO5tiaA4bWpjGN/EQIgGMljyNuH0tQR94c5PDiVxeSVfvdw96eR1evuHvQHaLIy7dNV56y4ScAM46gVl9Bhde2tTOYv4dkcurqXD5FV6+4e9YNiq/e7h70B2CzU+NWqcSfrDx7ENBkyatQ4QBewG5ckYTMSZ5lcXklTk7w/1TySpyf4f6oDtFCn6SpnPnnlEevNdNGsxoAvE9ZMnnmoG1UKzRLWVHZ4BomY3c3DCcz/2OgWSpyf3D3qLg6dP6ep2ag6q45QGjm44NHZxPUCvjWmtLNrEB7juvDyZLn3gN+XQN0zejDgRGAUnryH2isKZoWh9OiXARTfBecHOEOEiJb38DjWnavzh5HW5Yiu3AERO/nEj/ALVFWg6kk72sRd9CX0U6ztYCLQ+nO6G3bn2Wggg3pktB4ewL1aqtF1Qna1AAd+C3OZAuhozJJwzwMA5RtPVp0QLLVEZAtrOGUHAvg8cetdQ1ScTOwAJzmi/nPSVDwUnLM5/JEHc+ztqOaKNQukm+0GA+9luzzIxjjMysN0FaaYb+q74aGl10DeJJdUc5gm8IbAECZWinqdUkEMYIxH6sx0E/vOU5S0Ra4E16jQOjSps/mV1HD1Iq10++n/Du+hE0W2g1XPq2ZzqpfhIhrWlzju4BoBg449pkBa22Guyq9wphgLnQTkTDjLg0RJAiTxjmp46JrcbVafUAPwag0Q7/AMi2HsLv6KXh5vb5hSt0Ksys6maTHUgWxVYWhrbxBcWuBykEOvTiYBO9jO8NtNUsbVGxa+oHhsBuLaRBJhuG45tNsngRBU+dC/tLYf8AdUH/AOupb6WhGx5lpI63VTnniXwrFh7W+/8AIcipU9EVm1Xlj2kuJAul0kPpBznebeILroxAggzGJXmlYq1FjzdrS6nVBLMWkFrYaZ644gmDGKug0RSGdJzu1jX/ANV68gogOGwYJEY2Zh4jkCTlwTgW1v8AIKVy1/J/PkNKRBmr/FfHshWJVLVjTlOnZ2irQq2YAuG9S+jGJJN+lLWNxzddVnstqZUaH03te05Oa4OB7CMFelZWINyIikET5Va6n1dFtEdKs4OcOR2NIkEdtRp6k/wdz/r69Wp91rtgwdgpw4jqc5ylkQHNYbBSotu0qbKbc4Y0NE8SYzPWulEQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAFHWrQdne4v2dyoc6lMupPPKX0yHEdRJCkUQESLHaqf1dcVB0a7BPUG1ad26OtzXlDpK0NwdYqrjxNOpQcz1Go9jj62hSyIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgP/9k=',
    type: 'APP',
    url: 'http://Product.com',
    section: 'TOP',
    CreatedAt: addOrSubtractDaysFromDate(0)
  },
  {
    id: 1,
    img: 'data:image/jpeg;base64,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',
    type: 'WEB',
    url: 'http://WebClear.com',
    section: 'BOTTOM',
    CreatedAt: addOrSubtractDaysFromDate(45)
  },
  {
    id: 2,
    img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFRUVFxUWFhcYFRgVGhcWFxcXFhUWFhYYHyggGRolHRUVITIhJisrLy4uFx8zODUtNygtLysBCgoKDg0OGxAQGjUlHyUrNS4tKy4tMzItLS0tMC8tLysrLS41Ly0rLS8tLS0wLS0tLS0tNS0tLS0vLS0tLS0tLf/AABEIALwBDAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EAEkQAAEDAQQGBQcICAYCAwAAAAEAAhEDBBIhMQUGEyJBUVJhcZGSFDJTgaHR0gcXIzNCYrGyFiRjcrPB4fAVNEOCk/FUcyU1wv/EABoBAQADAQEBAAAAAAAAAAAAAAABAwQCBQb/xAAyEQACAQIEBAIJBAMAAAAAAAAAAQIDEQQSIVETMUFxBZEiMkJSYaHB4fAUgdHxM3Kx/9oADAMBAAIRAxEAPwD7iiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgOex22lVbepVGVG5SxwcJ5GMiuhcFt0PQquvvpi/ECo2WVAOQqsh49RXOdH2hn1NpLh0K7BUEcm1GFrx2uL0BLoof/Fa1P6+zPA4voHyhvhAFWeoMPaoyvr5ZhUfTa19Qs867dw3Q6HNcQ5pxiCBiuZSUVdllOlOo8sFdlrRU8/KBR9BX7mfEvPzh0PQV+5nxKvj09zS/DsSvYZckVMPyi0PQWjws+JeT8pFD0Fo8LPiXXFhucPBV1ziy6oqR85Vn/8AHtPhZ8SwflMs/oLT4WfEus8dyt4equcS8IqN851m9BaPCz4lg/KfZvQWjws+JTdHDpyXQvSKi/OfZvQWjws+JPnQs3oLR4WfEpOWmi9IqJ86Fm9BaPCz4k+dGzegtHhZ8SnKzhySL2iog+VCzegtPgb8Sx86Vm9BaPCz4l1klscurBdS+IqH86Vm9BaPCz4k+dKzegtHhZ8SnhT2Of1FPcviKh/OlZvQWjws+JPnSsvoLR4WfEp4M9iP1NLcviKh/OlZfQWjws+JdFn+UazvEijXHDFrfiTgVNiHi6K5yLoiqA1/oeireFvxLHzg0PQ1/C34l0sNVfsnKxtB+0XBFUma+USYFGvPK634lvfrlTGBo1geRa0EdoJkI8NVXsnSxdF+0WZFWv0ypeiq9zfetzNaqREhlThwHEgcDnjkuXRqJXaOo16cnZMn0UHZ9arNUE0XOruxF2i01bpzh7m7lMxB3yMwtorWyp5tOnZxwNU7Z/YaVMho7doexVFxLqPtWnbLTdcqWmgxwza6qxpHqJlaf8DD/r6tWt90u2bOw06QaHN6n3lIWWy06bQymxrGDJrGhrR2AYBAbkREAXyXXSpd0hWAMBwp3uExRkT3DuX1pfIdexOkKvYz+CsuL9Rdz1vB0nXd/d+qIVwXVovQ9a0FwosvFsF281sAzHnEcio4vIwV1+TVwd5UL12abMeXn4+rNebQhmmkz6fHV+FQlOK1VufdIiKmptuAnYH1Ppn2XlAVmFpLXAtLSQ4GQQRmCF9F1a0ZdtDHDSba8XvomvJL90iINQ4DPLgoax2M2vSr79Msa15fUYcw2ndADow3iG95iVr4Wit1f5yPIWLbcs1mkr3Sa/azK/pTQVos7GvrUyxr8Gm804xMEAkgxOfJeNFaDtFpDjQpl9yL2+1sTMecRORX0Ks2tbqVtoVKVRkPv2YvY5ghohoBI4lkn/2lQuoFodSstvqN86mwPEj7TWVCAR2hXqCT+BhliJOm20syt21KZY9H1atUUGMJqEuF0kNxaCXA3iAIunuXRY9XbVVqVKVOmXPomKgvtF0yRmXQfNOSvdmsjKlvsekKI+jtG0Dx0Koo1JB7YI7WnmmrFQttelXDNpJHaHVSFbGJlqVX02+dz5zR0fVdW8nDXbW8WXC4DeEyJJjgeKzV0XXFY2bZuNYEC403jMB2bTGRmeCvzKLbRaLDpKkIFR7WV2j7FUNLQT2+b4OalNBUG+X6SqyA5uyaHHJoNO84nqlrfCromSbuUJuo2kT/AKB/5afxri0Xq1a7Q1zqNMvDHFjvpGthwAJG84cwrI/QocS52nKRJxJ2hz/5V2alWYv0ba6bawpk1nAVS4tA3aW9eBkT/NWqVkZpRuyuP1W0hQa57rO4tAJMPY4iARN1riTgTwKrIf1nvK+s6vWJ9hFS12m3CrQuXYD31GlxcIIJJ3sC0AdJfKqzgXOIEAkkDkCZAV9J3bMldWSNd7rPeVm/1nvKQi1xR58jN/rPeVkVDzPeVhZXZw2bKN5xDQTJwzKsFJt0ACcOv2ri0PZ4F88cB2cSpWz0C9waOPsHEq6CSVzBiJOUlFHuy0CROOOAx4cT/LvVn1f0JSIv1N49GeHXC1U7GAABkMAvG0deLb27jgMJ6jz/ALxVFao3G0XY9TB4dQd5K9izVrfZaUFxY2MBDZugdgwifxWdJ6LZaGBzYvQC1wxBGYxGYx9qpGmBs6B3b20vUzzAdTqPBkyTFzI81zal6brUqzKN6aT3OvNOMbrnS3omR2GT6sPClH0ovVHq54yVpLQlq9lLHFrhiM8V5L9m1zhnGHbII9qsVrqMqnLLM8VyaSs9IseSIN05Kx101lkihYdqWaL7E3qqwCy07oAG9gMPtuUuovVkfqzO1/53KUWCXNm+PqoIiKDoIiIAvkOvB/8AkavYz+Cvry+Qa8//AGNXsZ/AWXF+ou563g3+d/6/VEHUbKk9VtK0rMa21vRUa1ouielPZ5yiyV2WBjHMqscWNc5rdm5+ABFRpdvQYJbK82lJxldH1OMpxqUmpfDl3JfReltGWeo2q1toc9k3QYzILeY4E5rbR1vptba6zQ5tptDhcwBDGNAazeOZAvHLOFxNFmBbeNA0/wBXDBdF8PDmbc1DdktgVZkkEEQtFK12UiYYHlmBcKTSHbQ3w4bI0xu3YN2SCcZW6L2seBUgr3kpPu+nO3a/M6dE66WplZjq1Z76QO+2GYtIIMQBiJn1LrZrFZGeXhl+7amm4LkQ5zHhwOOAvOn19S4bBbLIDRc/ZE05DgWgh+1quaS+AAbjBey+02Fyav22zNona3L4NYiWMe6Ni0MgPEHfmAcJVkW+rM9VQd2o2/s7tR9am2S/TrBxpO32wJLamRgHgR+A5lbNEaz0KVe31HX7tpnZw2Tiah3hOHnBeLHbrJUnClQF4S9zaBe4CmwF2xdScIvBzoYWyXHtWvRzrI1zHvdQLXNsTbpElrmBnlBe0jdBuuk/avcZVsTLUSu3Y06i6zNsb3Nqgmi+CQBJbUbF1wHs9TeS6aGuLaVvr2hrC+hXuhzDAcQGgAgHCRvYZEFcOm6ll8nijcvuqtrGBvNFRtW9RnosikIykquOV0TLU3Lc5+gzjctTZ+yIgdWZ/Erl0bpyjT0farKb9+rULqe7IuxTAvGcDulVoryVfGJjnKxZ9UdYKVGnWs1pDnWes04NElr8ASBwkQZ4FoVZqAAkNMgEwSIJE4EjhI4Lyi0QjZ3MVSTasERFpiY5GVvstAvcG9/UOK0Kd0TZrrbxzd7Bw967SKZuyOwNAwGQyVn1d0ddZtCMX5dTeHfn3KJ0Jo/b1Q37I3nnq5evLv5K8loHJcV6uVZUTgcNmlxH+xyCioSrgT+878VPVLQOCqNaq4udPSd+Kzxnc9XJY9a11opMiSb4iJn6mvkq7oCqX2mlhjeOWRlrhiOHaP6qV1kYTSH/ALG8vQ1lxaqAi10bwxv8cDkc+frxU9GWIv8ATsDhi4QtWkGfRv8A3VN1qpIhRlvZuP7CqFJ21JcddCZ1c+ob2v8AzuUmo3V/6kfvP/MVJLK+ZrjyQREUEhERAF8h13Y7/Ea0AnBmQn/QX15UPWDQ9SpbHvbdg3Ikkf6ZHLqVGIg5Rsjf4dWjSquUtvqiguou6Lu4rGxf0XeEq8nViv8Ac8R9yfoxX50/EfcvPWGlsfRS8UpW5rzKKaD+g7wlaalid0HeE+5fQW6s2jnT8R9y2jVa0c6fiPuV0aEkZaniFOXVHy+pZKg+w7wlajQf0XeEr6sdUrR+z8R9y56upVoOWz8R+FXxpswVMTB8mfMNk/ou8JQMqdB3hK+jP1LtQ9H4j7lpOqlo+54j7lcoGOdZMoIY/oO8JWSx3Qd4Sr4dVrR+z8R9yx+i1o/Z+I+5XxSMk5t9Ch7N/Qd4Smxf0HeEq+fotaOdPxH3J+ito50/EfcroyjuZJqT6FC2L+g7wlNk7oO8JV8/RW086fiPuWP0UtPOn4j7lcqkdzJOnU90oZpu6DvCU2bug7wlXs6p2nnT8R9y8/olaf2fiPwq6NWG5mlRq+6yoaNsNSo+BTeQMXQxxw4DAcferC6z1vQ1f+N3uV31d0X5PSumC9xl5GU8AOoD8Smnrfs2QCQ5wMEDzQ2Jce8D1zwlUTxmVu3I0R8OzwTm7PY59B2M0qQB8928/t4N9Q9sruc0qv2G1VKz6VJ917XF5JLYO4L7CBhmOY4rq0VbgGU6BvB5F0OwdvEnF17+uapk5SdzbCEIRUUSjKJKgDYwL7nEAX34kwM+5WjQVuvufSdBcxzseYDsMAIyu8eKh6tJoe910B1929Anzjxj+amDdyZJERrQ1ps4ukEbQY8PqK2TslCasOItVnByviOOH3Ty7MFYdbjNDP8A1B/BrKs6qhwtNDkarJxkE3uYwJV6fos4tqfWS1c2kaY2bo6JXeKa5tIM+jf2FZMxdlOvQP1X+5/5ipFR+g/qz++/8xUgqmWhERAEREAUHa/8wf8Ab+V6nFB2v/MHtb+V6A60WYWEBgv617bWExOPJVXWEUzVa3ZODtxz6wpveWhpkNploO8eeQniuQUH+UXgx17ykujZum4ZF418rkY3PUqZVbO1jbDCKUczlbS/L8/O5fKdcZLeHKg6IoltShFN7arDU8oeWkBwIObzg+TdIiYXXpSvXv2hzH1W7OnTdTDZuufvSIjeyGA59ilVHa9vzmQ8Ks+VS6fW3x79i5OcBiTCw6kDwVUa2q41aJeXNu0nNdVZtIc68Kl3ITl2SpttocymxtNrHFoDYLnMEARgYceAz710pN9CmdJR0Urv7XOirZWjEmO1aTZmxIcI5yF50naaZpHaNvDCWhm1g8DdjEA4+pVancZZ7rrPtDtHik40XgEOAvVX04JbnAEcBELmdTKyyjh1Uje/WxaXWSOIxyWDY3KsVaDbrgWVKs0KbLM803S17bwOY+jN6DjGCn9J7Qts7A9wJqMbUcw4xcdek8BMYoqt76Ezwqi0s3P+L/bub/JHLDbMTlj2KJsprBzCalV36y+iWuxaaIDoc4RjkN7rUzoex7EODnMJc68bjbgyAAuyQAAAMOXE4qYzcuhxVoKmvWuZbYivQsJXaazeYWNs3mFYZzkqWdrGlznANaCSTkABJJXze0jyquaxeA3GKROIYGubwkTkS3rdMQrVrtpAlrLOwOIqOF9zTF0Ztg85APYOtQVr1euXdjUc4gk790Q0AADCBIkwY44zxoq6u3yBu1caG1qQEAAVchAxa6fbKjrNUHldH98cukfWunQtitNKsHVIc1rCL18Eg7OMZzxLsuY5KEZVqMtVIuY4NFVoDoMEEtxmMcXQvQjNPyM7iy86tOG3rc5dz4kf1XFbK7QXklo33ZkDievPBQej9JRanDOS+cJ6Hxf2UtNtcDVbEiXnARBxdie38VS5tZiWtEbNZfNLTkSwHCcAyvjET9r+5Vc1TaRa6MekZMGcA4HEDEeuFL6QtBe5gBBa+DnMQ1w4RMl4Of8AWP1aoU2Wlji4l1NwvHh5w+yRKqo4pZW9yGtT6NV00KYecXAYyILReJa0YGTi0yI5r0NJtqUqt6G3AATMAl3KcscM1B2yp+rnKS1oPHea8z1zmt1DCz2o+vuqvhdQnGUMxbfUtmgng0iQQQXvggyDvHipFQGo5/U2cMX4ct44KfS99TsIiIAiIgCg7X/mPD+V6nFCWz/MeH8r0B1rC9gLntdnDhO9gD5pgnIx7AgOWtQrHKoG+oH7RPLlA9S1soVhnUBwIi7x4Gf5LFChiDs6syDi8wMspzyy/wCh5FjiRcr8Z3hkZMDvHXh3952V8NXvd+Z5FnrjOqDgPsgdpiOxNjWhv0gkXpMATJkACDGGE/ivbrFMHZ1cMBvDKcZnj/eYC81LBuNAp1iDB87GMRBz4GfXjxTO/wAQ4a+Pmzw+jXIgVADzugzvTMRygerjOG3Z1L0392ZiBlAwmOco+wT51OtLhJh3mk4XRGWXt7Vk2GQBs60DKHCcTMc85x6xjxEZ2Tw18fM0bG0elbw+zHGTjjGGHtW1zKkCH9KThjOXDCMvb1HJ0aM9nVxGQdgAcIgjkO3HqCyNHDEXK+fB2Zk4kxgI/uVOdkcNbvzOd1K0cKo8I5Hqx4LY5lWfrOOWGUg9HAxIW+rotpI3Ksx0sGwwtEGM8/8AqJ8iwNz2Vc9RI4QePOPb6gzscNbvzZodTrZCqO0gTN2Jy6WK6qRcGi8ZIGJ5niVr/wAOGE06zsXOxdkbzboMDHzAf93aRsboptQhrmVmi6WzeAGAAxAGfq96hyudRgkery59I29lGm6q87rR6ySYa0dZJAHWVPGxtXzv5UbUy5TotMRXoF2eN2o15gjO6ACRjn1KuU1FXO0m+RFaRq2sg1H3SC9rmFvSvC6HThAECcPfJWCrbm1WCuabmFjpIutM3jyiRd2WQzJXDYqrSw3Tg5+7daHYuJMloPZkIB4nhKaZ0kabmBozZIGRMlvnFzTdG6eyDxIWWFdW9IizWjOt1Zt5oAYbxgkEYdvNLSwtaSxpnOL7mDvEx3LDLVSc28HMBZ55LMGnDrw9pynrjrbpOmcBWa7AOgBzZGGIJP3hI4rvjQfIlIrNi07VZVDXBlQNpOFx7xiTUaYLjPA4cTEKxBrKgcboa5puEiGtcbvEnAYGPURiqyKDRV3mN+reJI5HAhpnINbj+OBUtYbewNFMkmHOk4yQ5pBAEQRdwgjG6DyK6ryWXmcKNyKqte4scYhzHndgARdJ4nIGIyxGGa2aDs4bde6QbzKf2mkXngNk4AZ5zlAXmhaG3KbRvFrKjjE4C7lzEmlxwwJBK1Co59Ngaxzi99NuWd2Xw53HCmc8RzMYc2eTKuRy46lz0m4MowXRnB4mCXEXRm6cRGaWW30zTq07wJqU3XQMRMuMHlgHZ9eGKhn6WZVOw2YmDIJD53HF0ZTiTzwEwpCxW2hvMEEGnVDHAAtBF2YcDhgXg9h4YlSyxjlb1ZZlZddR3E2OmTzf+d0KeUFqSP1Oll9rLneMhTq0R0SAREUgIiIAoW2/Xj1fg9dlt0xQpG6+o2/EimJfUI+7SZL3eoKAq6UdUrmLPXY0RD304DyYgMaCXNAD3El4b5sdkN2BPtXoLhJd0j4SvMP6TvCVIOqvZA8zee0xG66PZlK8UrBEfS1CZJ87POBBnASue4/m7uWNjU5v7kB1U9HNERVq4feGM5k4LYywtAjaVMgJv4mCDPKcIw4SuDyepzd3D3p5LV+97PegO5tiaA4bWpjGN/EQIgGMljyNuH0tQR94c5PDiVxeSVfvdw96eR1evuHvQHaLIy7dNV56y4ScAM46gVl9Bhde2tTOYv4dkcurqXD5FV6+4e9YNiq/e7h70B2CzU+NWqcSfrDx7ENBkyatQ4QBewG5ckYTMSZ5lcXklTk7w/1TySpyf4f6oDtFCn6SpnPnnlEevNdNGsxoAvE9ZMnnmoG1UKzRLWVHZ4BomY3c3DCcz/2OgWSpyf3D3qLg6dP6ep2ag6q45QGjm44NHZxPUCvjWmtLNrEB7juvDyZLn3gN+XQN0zejDgRGAUnryH2isKZoWh9OiXARTfBecHOEOEiJb38DjWnavzh5HW5Yiu3AERO/nEj/ALVFWg6kk72sRd9CX0U6ztYCLQ+nO6G3bn2Wggg3pktB4ewL1aqtF1Qna1AAd+C3OZAuhozJJwzwMA5RtPVp0QLLVEZAtrOGUHAvg8cetdQ1ScTOwAJzmi/nPSVDwUnLM5/JEHc+ztqOaKNQukm+0GA+9luzzIxjjMysN0FaaYb+q74aGl10DeJJdUc5gm8IbAECZWinqdUkEMYIxH6sx0E/vOU5S0Ra4E16jQOjSps/mV1HD1Iq10++n/Du+hE0W2g1XPq2ZzqpfhIhrWlzju4BoBg449pkBa22Guyq9wphgLnQTkTDjLg0RJAiTxjmp46JrcbVafUAPwag0Q7/AMi2HsLv6KXh5vb5hSt0Ksys6maTHUgWxVYWhrbxBcWuBykEOvTiYBO9jO8NtNUsbVGxa+oHhsBuLaRBJhuG45tNsngRBU+dC/tLYf8AdUH/AOupb6WhGx5lpI63VTnniXwrFh7W+/8AIcipU9EVm1Xlj2kuJAul0kPpBznebeILroxAggzGJXmlYq1FjzdrS6nVBLMWkFrYaZ644gmDGKug0RSGdJzu1jX/ANV68gogOGwYJEY2Zh4jkCTlwTgW1v8AIKVy1/J/PkNKRBmr/FfHshWJVLVjTlOnZ2irQq2YAuG9S+jGJJN+lLWNxzddVnstqZUaH03te05Oa4OB7CMFelZWINyIikET5Va6n1dFtEdKs4OcOR2NIkEdtRp6k/wdz/r69Wp91rtgwdgpw4jqc5ylkQHNYbBSotu0qbKbc4Y0NE8SYzPWulEQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAFHWrQdne4v2dyoc6lMupPPKX0yHEdRJCkUQESLHaqf1dcVB0a7BPUG1ad26OtzXlDpK0NwdYqrjxNOpQcz1Go9jj62hSyIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgP/9k=',
    type: 'APP',
    url: 'http://texting.com',
    section: 'TOP',
    CreatedAt: addOrSubtractDaysFromDate(2)
  },
  {
    id: 4,
    img: 'data:image/jpeg;base64,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',
    type: 'BOTH',
    url: 'http://testing.com',
    section: 'BOTTOM',
    CreatedAt: addOrSubtractDaysFromDate(10)
  }
];
export const settingsData: SettingsType[] = [
  {
    id: 1,
    codCharges: '[[300,50],[2000,30]]',
    deliveryCharges: '[[300,55],[2000,30]]',
    expressCharges: '[[10000,80]]',
    referalBonus: '50',
    CreatedAt: addOrSubtractDaysFromDate(1)
  },
  {
    id: 2,
    codCharges: '[[466,50],[9000,30]]',
    deliveryCharges: '[[800,66],[3000,30]]',
    expressCharges: '[[70000,80]]',
    referalBonus: '600',
    CreatedAt: addOrSubtractDaysFromDate(0)
  },
  {
    id: 3,
    codCharges: '[[866,50],[10000,30]]',
    deliveryCharges: '[[600,66],[8000,30]]',
    expressCharges: '[[70000,80]]',
    referalBonus: '275',
    CreatedAt: addOrSubtractDaysFromDate(30)
  },
  {
    id: 4,
    codCharges: '[[966,50],[2000,30]]',
    deliveryCharges: '[[800,66],[3000,30]]',
    expressCharges: '[[70000,80]]',
    referalBonus: '150',
    CreatedAt: addOrSubtractDaysFromDate(60)
  }
];
export const couponData: CouponType[] = [
  {
    id: 1,
    name: 'Summer Sale2024',
    coupon_code: 'SUMMER2025',
    percent: '20',
    expiry_date: '2024-08-20',
    min_amount: 5000,
    createdAt: addOrSubtractDaysFromDate(5)
  },
  {
    id: 2,
    name: 'Abhi ',
    coupon_code: 'SUMMER2024',
    percent: '30',
    expiry_date: '2025-08-20',
    min_amount: 5000,
    createdAt: addOrSubtractDaysFromDate(0)
  },
  {
    id: 5,
    name: 'RISAV Sale2027',
    coupon_code: 'RISAV',
    percent: '50',
    expiry_date: '2024-08-20',
    min_amount: 6000,
    createdAt: addOrSubtractDaysFromDate(45)
  },
  {
    id: 3,
    name: 'RAHUL Sale2024',
    coupon_code: 'RAHUL2025',
    percent: '30',
    expiry_date: '2024-08-20',
    min_amount: 5000,
    createdAt: addOrSubtractDaysFromDate(30)
  },
  {
    id: 6,
    name: 'DEV Sale2024',
    coupon_code: 'DEV2024',
    percent: '30',
    expiry_date: '2024-08-20',
    min_amount: 1000,
    createdAt: addOrSubtractDaysFromDate(1)
  }
];

export const LeadData: LeadType[] = [
  {
    id: 1,
    name: 'Jane Doe',
    mobile: 7894568952,
    description: 'Interested in the premium package',
    agentName: 'Agent Smith',
    status: 'complete',
    source: 'Website',
    createAt: addOrSubtractDaysFromDate(0)
  },
  {
    id: 2,
    name: 'karan',
    mobile: 789456652,
    description: 'Interested in the premium package',
    agentName: 'Agent Smith',
    status: 'pending',
    source: 'Social Media',
    createAt: addOrSubtractDaysFromDate(1)
  },
  {
    id: 2,
    name: 'karan',
    mobile: 789456652,
    description: 'Interested in the premium package',
    agentName: 'Agent Smith',
    status: 'pending',
    source: 'Email Campaign',
    createAt: addOrSubtractDaysFromDate(8)
  },
  {
    id: 2,
    name: 'karan',
    mobile: 789456652,
    description: 'Interested in the premium package',
    agentName: 'Agent Smith',
    status: 'pending',
    source: 'Referral',
    createAt: addOrSubtractDaysFromDate(48)
  },
  {
    id: 2,
    name: 'karan',
    mobile: 789456652,
    description: 'Interested in the premium package',
    agentName: 'Agent Smith',
    status: 'pending',
    source: 'Advertisement',
    createAt: addOrSubtractDaysFromDate(46)
  },
  {
    id: 2,
    name: 'karan',
    mobile: 789456652,
    description: 'Interested in the premium package',
    agentName: 'Agent Smith',
    status: 'pending',
    source: 'Event',
    createAt: addOrSubtractDaysFromDate(1)
  }
];

export const walletData: WalletType[] = [
  {
    userId: 21224820,
    userName: 'gourav',
    amount: 300,
    type: 'DEBIT',
    description: 'description',
    source: 'REFERAL',
    Date: addOrSubtractDaysFromDate(0)
  },
  {
    userId: 21224826,
    userName: 'Harsh',
    amount: 1000,
    type: 'CRITED',
    description: 'happy',
    source: 'REFERAL',
    Date: addOrSubtractDaysFromDate(2)
  },
  {
    userId: 21224858,
    userName: 'Vivek',
    amount: 5000,
    type: 'DEBIT',
    description: 'Pin',
    source: 'REFERAL',
    Date: addOrSubtractDaysFromDate(15)
  },
  {
    userId: 21224856,
    userName: 'devraj',
    amount: 6000,
    type: 'CRITED',
    description: 'Pin',
    source: 'REFERAL',
    Date: addOrSubtractDaysFromDate(30)
  },
  {
    userId: 212248577,
    userName: 'jay',
    amount: 5000,
    type: 'DEBIT',
    description: 'Pin',
    source: 'REFERAL',
    Date: addOrSubtractDaysFromDate(8)
  }
];

export const CrmCallerList: CrmCallerListType[] = [
  {
    id: 20222222,
    name: 'devraj',
    type: 'admin',
    time: '16:59 PM 18-09-24',
    loginId: 'devraj123456@.gmail.com',
    password: 'snsfk554',
    status: 'OFF',
    createdAt: addOrSubtractDaysFromDate(0),
    email: 'admin@gmail.com',
    ivrNumber: 456,
    leadCategory: 'category1'
  },
  {
    id: 20225889,
    name: 'jay',
    type: 'manager',
    time: '8:59 PM 10-09-24',
    loginId: 'jay123456@.gmail.com',
    password: 'faf54544',
    status: 'ACTIVE',
    createdAt: addOrSubtractDaysFromDate(1),
    email: 'admin@gmail.com',
    ivrNumber: 456,
    leadCategory: 'category2'
  },
  {
    id: 202286452,
    name: 'Bhim',
    type: 'caller',
    time: '19:23 PM 20-09-21',
    loginId: 'bhimjay545@.gmail.com',
    password: 'snsfk554',
    status: 'RESIGN',
    createdAt: addOrSubtractDaysFromDate(2),
    email: 'admin@gmail.com',
    ivrNumber: 456,
    leadCategory: 'category3'
  },
  {
    id: 20222277,
    name: 'raj',
    type: 'caller',
    time: '16:59 PM 18-09-24',
    loginId: 'devraj123456@.gmail.com',
    password: 'snsfk554',
    status: 'OFF',
    createdAt: addOrSubtractDaysFromDate(45),
    email: 'admin@gmail.com',
    ivrNumber: 456,
    leadCategory: 'category4'
  },
  {
    id: 20222277,
    name: 'raj',
    type: 'caller',
    time: '16:59 PM 18-09-24',
    loginId: 'devraj123456@.gmail.com',
    password: 'snsfk554',
    status: 'OFF',
    createdAt: addOrSubtractDaysFromDate(8),
    email: 'admin@gmail.com',
    ivrNumber: 456,
    leadCategory: 'category5'
  }
];

export const RxorderCrm: RxOrderCrmType[] = [
  {
    id: '1011',
    name: 'Apple Watch',
    description: 'Size-05 (Model 2021)',
    image: product4,
    category: 'Sports',
    pics: 32,
    price: 70,
    sellPrice: 50,
    sellsCount: 450,
    status: 'In Stock',
    createdAt: addOrSubtractDaysFromDate(0),
    paymentType: 'UPI'
  },
  {
    id: '1012',
    name: 'Morden Chair',
    description: 'Size-Mediam (Model 2021)',
    image: product1,
    category: 'Interior',
    pics: 10,
    price: 150,
    sellPrice: 99,
    sellsCount: 750,
    status: 'Out of Stock',
    createdAt: addOrSubtractDaysFromDate(1),
    paymentType: 'Banking'
  },
  {
    id: '1013',
    name: 'Reebok Shoes',
    description: 'size-08 (Model 2021)',
    image: product5,
    category: 'Footwear',
    pics: 24,
    price: 149,
    sellPrice: 49,
    sellsCount: 280,
    status: 'Inactive',
    createdAt: addOrSubtractDaysFromDate(3),
    paymentType: 'Paypal'
  },
  {
    id: '1014',
    name: 'Cosco Vollyboll',
    description: 'size-04 (Model 2021)',
    image: product6,
    category: 'Sports',
    pics: 8,
    price: 139,
    sellPrice: 100,
    sellsCount: 500,
    status: 'In Stock',
    createdAt: addOrSubtractDaysFromDate(5),
    paymentType: 'UPI'
  },
  {
    id: '1015',
    name: 'Royal Purse',
    description: 'Pure Lether 100%',
    image: product4,
    category: 'Life Style',
    pics: 52,
    price: 89,
    sellPrice: 59,
    sellsCount: 800,
    status: 'Published',
    createdAt: addOrSubtractDaysFromDate(7),
    paymentType: 'BTC'
  },
  {
    id: '1016',
    name: 'New Morden Chair',
    description: 'size-05 (Model 2021)',
    image: product3,
    category: 'Interior',
    pics: 6,
    price: 20,
    sellPrice: 20,
    sellsCount: 6,
    status: 'Inactive',
    createdAt: addOrSubtractDaysFromDate(8),
    paymentType: 'Banking'
  },
  {
    id: '1007',
    name: 'Important Chair',
    description: 'size-05 (Model 2021)',
    image: product2,
    category: 'Interior',
    pics: 32,
    price: 39,
    sellPrice: 39,
    sellsCount: 32,
    status: 'Out of Stock',
    createdAt: addOrSubtractDaysFromDate(3),
    paymentType: 'UPI'
  },
  {
    id: '1008',
    name: 'Nivya Footboll',
    description: 'Size-05 (Model 2021)',
    image: product2,
    category: 'Sports',
    pics: 32,
    price: 39,
    sellPrice: 39,
    sellsCount: 32,
    status: 'Inactive',
    createdAt: addOrSubtractDaysFromDate(12),
    paymentType: 'Paypal'
  },
  {
    id: '1009',
    name: 'Green Morden Chair',
    description: 'Size-Mediam (Model 2021)',
    image: product1,
    category: 'Interior',
    pics: 10,
    price: 99,
    sellPrice: 99,
    sellsCount: 10,
    status: 'Published',
    createdAt: addOrSubtractDaysFromDate(16),
    paymentType: 'UPI'
  },
  {
    id: '1010',
    name: 'Bata Shoes',
    description: 'size-08 (Model 2021)',
    image: product1,
    category: 'Footwear',
    pics: 24,
    price: 49,
    sellPrice: 49,
    sellsCount: 24,
    status: 'Out of Stock',
    createdAt: addOrSubtractDaysFromDate(33),
    paymentType: 'BTC'
  },
  {
    id: '1011',
    name: 'Cosco Vollyboll',
    description: 'size-04 (Model 2021)',
    image: product6,
    category: 'Sports',
    pics: 8,
    price: 49,
    sellPrice: 49,
    sellsCount: 8,
    status: 'Published',
    createdAt: addOrSubtractDaysFromDate(11),
    paymentType: 'UPI'
  },
  {
    id: '1012',
    name: 'Royal Purse',
    description: 'Pure Lether 100%',
    image: product4,
    category: 'Life Style',
    pics: 52,
    price: 89,
    sellPrice: 89,
    sellsCount: 52,
    status: 'Published',
    createdAt: addOrSubtractDaysFromDate(4),
    paymentType: 'Banking'
  },
  {
    id: '1013',
    name: 'New Morden Chair',
    description: 'size-05 (Model 2021)',
    image: product3,
    category: '	Interior',
    pics: 6,
    price: 60,
    sellPrice: 20,
    sellsCount: 52,
    status: 'Published',
    createdAt: addOrSubtractDaysFromDate(5),
    paymentType: 'Paypal'
  }
];
