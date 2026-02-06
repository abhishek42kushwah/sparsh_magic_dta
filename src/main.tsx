
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { basePath } from './context/constants'
import { S3UrlProvider } from './app/(admin)/apps/ecommerce/ImageUrl/ImageUrl'

createRoot(document.getElementById('root')!).render(
  <S3UrlProvider>      
 
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  
  </S3UrlProvider>

)
