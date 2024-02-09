import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/userReducer";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z
    .object({
      username: z
        .string()
        .min(2)
        .max(16)
        .refine((value) => /^[^0-9]/.test(value), {
          message: "Username cannot start with a number",
        }),
      password: z.string().min(4).max(32),
      confirmPassword: z.string().min(4).max(32),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSignup = async (formData: FormData) => {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    localStorage.setItem("token", data.acessToken);
    dispatch(userActions.auth(data.payload));
    navigate("/");
  };

  return (
    <div className="flex h-screen min-h-[400px] items-center bg-background px-4 pt-24 text-copy">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="mx-auto mt-[-150px] min-w-[290px] max-w-[400px] rounded-md bg-foreground px-4 py-6"
      >
        <h1 className="mb-2 text-center text-xl">Sign up</h1>

        <FormInput
          label="Username"
          name="username"
          register={register}
          isError={!!errors.username}
          errorMessage={errors.username?.message}
        />

        <div className="mb-2"></div>

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />

        <div className="mb-2"></div>

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          isError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <div className="mb-4"></div>

        <button className="mb-6 w-full bg-border py-1" type="submit">
          Submit
        </button>

        <div>
          Have already an account?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Signup;
