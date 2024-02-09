import { useQuery } from "@tanstack/react-query";
import { fetchAllDomain } from "../api/domains";
import DomainCard from "../components/DomainCard";
import { Domain } from "../lib/definition";
import { privateFetch } from "../api/privateFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  const { page } = useParams();
  const pageNumber = Number(page) || 1;

  const navigate = useNavigate();

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["domains", pageNumber],
    queryFn: () => fetchAllDomain(pageNumber),
  });

  const [data, setData] = useState(rawData?.result || []);

  useEffect(() => {
    if (rawData) setData(rawData.result);
  }, [rawData]);

  const onDelete = async (id: string) => {
    const newData = data.filter((i) => i._id !== id);
    setData(newData);

    await privateFetch("http://localhost:3000/api/domain/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  };

  const onEdit = (id: string) => {
    return async (formData: Domain) => {
      const newData = [...data];

      const index = newData.findIndex((i) => i._id === id);

      if (index !== -1) {
        newData[index] = formData;
        newData[index]._id = id;
      }

      const updatedDomain = newData[index];

      await privateFetch("http://localhost:3000/api/domain/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: updatedDomain.name,
          ip: updatedDomain.ip,
          port: updatedDomain.port,
          username: updatedDomain.username,
          password: updatedDomain.password,
        }),
      });

      setData(newData);
    };
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (data) {
    const pages = [pageNumber];
    if (pageNumber - 1 >= 1) {
      pages.unshift(pageNumber - 1);
    }

    if (pageNumber + 1 <= rawData!.maxPages) {
      pages.push(pageNumber + 1);
    }

    return (
      <div className="p-4 pb-24">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
          className="mx-auto mb-8 grid min-h-[500px] items-start gap-5 px-6"
        >
          {data.map((domain) => (
            <DomainCard
              data={domain}
              onDelete={() => onDelete(domain._id!)}
              onEdit={onEdit(domain._id!)}
              center
              key={domain._id}
            />
          ))}
        </div>

        <div className="flex items-end justify-center gap-2">
          {pages[0] > 1 && (
            <>
              <button
                onClick={() => navigate("/1")}
                className="cursor-pointer select-none border-2 border-border px-4 py-2"
              >
                1
              </button>
              <p>...</p>
            </>
          )}
          {pages.map((i) => (
            <button
              key={i}
              className={`${i === pageNumber ? "border-primary bg-primary text-background" : "border-border"} cursor-pointer select-none border-2 px-4 py-2`}
              onClick={() => navigate(`/${i}`)}
            >
              {i}
            </button>
          ))}
          {pages[pages.length - 1] < rawData!.maxPages && (
            <>
              <p>...</p>
              <button
                onClick={() => navigate(`/${rawData!.maxPages}`)}
                className="cursor-pointer select-none border-2 border-border px-4 py-2"
              >
                {rawData!.maxPages}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
