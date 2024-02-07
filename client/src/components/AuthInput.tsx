import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function AuthInput({
  label,
  type = "text",
  name,
  isError = false,
  errorMessage,
  register,
}: {
  label: string;
  type?: string;
  name?: string;
  isError?: boolean;
  errorMessage?: string;
  register?: any;
}) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <label className="mb-1 block">{label}</label>
      <div className="relative">
        <input
          {...register(name)}
          className={`${isError ? "border-error" : "border-border"} ${type === "password" ? "pl-2 pr-9" : "px-2"} mb-1 block w-full border-2 py-1 outline-none`}
          type={type !== "password" || isShow ? "text" : "password"}
        />
        {type === "password" && (
          <button
            onClick={() => setIsShow(!isShow)}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          >
            {isShow ? (
              <EyeSlashIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
      <p className="text-sm text-error">{isError && errorMessage}</p>
    </div>
  );
}
export default AuthInput;
