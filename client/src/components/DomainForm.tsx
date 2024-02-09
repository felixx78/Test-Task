import { ZodType, z } from "zod";
import { Domain } from "../lib/definition";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

function DomainForm({
  title,
  onSubmit,
}: {
  title: string;
  onSubmit: (data: Domain) => void;
}) {
  const schema: ZodType<Domain> = z.object({
    name: z.string().max(32),
    ip: z.string().regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, {
      message: "Ip is not valid",
    }),
    port: z.number().min(1).max(65535),
    username: z.string().max(32),
    password: z.string().max(32),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Domain>({
    resolver: zodResolver(schema),
  });

  const onSubmitWrapper = (data: Domain) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitWrapper)}
      className="mx-auto min-w-[290px] max-w-[500px] rounded-md bg-foreground px-4 py-6"
    >
      <h1 className="mb-4 text-center text-xl">{title}</h1>

      <div className="mb-5 flex flex-col gap-4">
        <FormInput
          label="Name"
          name="name"
          register={register}
          isError={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <FormInput
          label="Ip address"
          name="ip"
          register={register}
          isError={!!errors.ip}
          errorMessage={errors.ip?.message}
        />

        <FormInput
          label="Port"
          name="port"
          type="number"
          register={register}
          isError={!!errors.port}
          errorMessage={errors.port?.message}
        />

        <FormInput
          label="Username"
          name="username"
          register={register}
          autocompleteoff
          isError={!!errors.username}
          errorMessage={errors.username?.message}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          autocompleteoff
          register={register}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />
      </div>

      <button className="w-full bg-border py-1.5" type="submit">
        Submit
      </button>
    </form>
  );
}
export default DomainForm;
