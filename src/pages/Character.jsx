import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Character = () => {
  const params = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}character/${params.id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [params.id]);

  return isLoading ? (
    <main>
      <div>Chargement en cours...</div>
    </main>
  ) : (
    <main>
      <div>{data.name}</div>
    </main>
  );
};

export default Character;
