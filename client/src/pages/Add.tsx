import { privateFetch } from "../api/privateFetch";
import { Domain } from "../lib/definition";
import DomainForm from "../components/DomainForm";
import { toast } from "react-toastify";

function Add() {
  const handleAdd = async (formData: Domain) => {
    await privateFetch("http://localhost:3000/api/domain/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    toast("A new domain has been successfully added.");
  };

  return (
    <div className="h-screen min-h-[650px] bg-background px-4 pt-12 text-copy">
      <DomainForm title="Add new Domain" onSubmit={handleAdd} />
    </div>
  );
}
export default Add;
