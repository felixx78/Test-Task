import { useState } from "react";
import { Domain } from "../lib/definition";
import DomainForm from "./DomainForm";
import { XMarkIcon } from "@heroicons/react/24/outline";

function DomainCard({
  data,
  onDelete,
  onEdit,
  center,
}: {
  data: Domain;
  onDelete?: Function;
  onEdit?: (data: Domain & { _id?: string }) => void;
  center?: boolean;
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div
      className={`${center ? "mx-auto" : ""} w-[200px] rounded-md bg-foreground px-4 py-3 text-lg`}
    >
      {(isDeleteOpen || isEditOpen) && (
        <div
          onClick={() => {
            setIsDeleteOpen(false);
            setIsEditOpen(false);
          }}
          className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-25"
        ></div>
      )}

      {isDeleteOpen && (
        <DeleteModal
          name={data.name}
          onCancel={() => setIsDeleteOpen(false)}
          onDelete={() => {
            onDelete!();
            setIsDeleteOpen(false);
          }}
        />
      )}

      {isEditOpen && (
        <EditModal
          value={data}
          onCancel={() => setIsEditOpen(false)}
          onEdit={(data: Domain & { _id?: string }) => {
            onEdit!(data);
            setIsEditOpen(false);
          }}
        />
      )}
      <div className={onDelete || onEdit ? "mb-3" : ""}>
        <p>{data.name}</p>
        <p>ip: {data.ip}</p>
        <p>port: {data.port}</p>
        <p>username: {data.username}</p>
        <Password value={data.password} />
      </div>

      <div className="flex gap-2">
        {onDelete && (
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="w-full rounded-md border-2 border-error text-error opacity-75"
          >
            delete
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => setIsEditOpen(true)}
            className="w-full rounded-md border-2 border-primary-dark text-primary-dark opacity-75"
          >
            edit
          </button>
        )}
      </div>
    </div>
  );
}

const Password = ({ value }: { value: string }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <p
      className=" cursor-pointer"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      password:{" "}
      {isShow ? value : Array.from({ length: value.length }).fill("*").join("")}
    </p>
  );
};

const DeleteModal = ({
  name,
  onDelete,
  onCancel,
}: {
  name: string;
  onDelete: Function;
  onCancel: Function;
}) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[300px] -translate-x-1/2 -translate-y-[60%] transform bg-foreground px-4 py-4">
      <p className="mb-4">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{name}</span> domain?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onCancel()}
          className="w-full rounded-md border-2 border-primary-dark text-primary-dark opacity-75"
        >
          cancel
        </button>

        <button
          onClick={() => onDelete()}
          className="w-full rounded-md border-2 border-error text-error opacity-75"
        >
          delete
        </button>
      </div>
    </div>
  );
};

const EditModal = ({
  value,
  onEdit,
  onCancel,
}: {
  value: Domain;
  onEdit: (data: Domain & { _id?: string }) => void;
  onCancel: Function;
}) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[300px] -translate-x-1/2 -translate-y-[50%] transform bg-foreground sm:-translate-y-[55%]">
      <div className="relative">
        <button className="absolute right-1 top-1" onClick={() => onCancel()}>
          <XMarkIcon className="h-6 w-6" />
        </button>
        <DomainForm title="Edit" onSubmit={onEdit} value={value} />
      </div>
    </div>
  );
};

export default DomainCard;
