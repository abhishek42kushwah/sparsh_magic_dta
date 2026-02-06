import { createContext, useContext, useState, useEffect } from "react";
const S3UrlContext = createContext<string>("");
import { ReactNode } from "react";
import { BASE_URL } from "@/types/validationSchema";
export const S3UrlProvider = ({ children }: { children: ReactNode }) => {
  const [s3url, setS3url] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}setting`)
      .then((response) => response.json()) 
      .then((data) => {
        setS3url(data.result?.setting?.s3Url); 
      })
      .catch((error) => {
        console.error("Error fetching S3 URL:", error);
      });
  }, []);
 
  return (
    <S3UrlContext.Provider value={s3url}>
      {children}
    </S3UrlContext.Provider>
  );
};

export const useS3Url = () => useContext(S3UrlContext);
