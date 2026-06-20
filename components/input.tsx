import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
  errors: string[];
  name: string;
}

const Input = forwardRef(
  (
    {
      name,
      errors,
      ...rest
    }: InputProps & InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <input
          ref={ref}
          name={name}
          {...rest}
          className="bg-inherit outline-none p-3 ring-1 ring-neutral-100 rounded-md w-full focus:ring-2 focus:ring-orange-500"
        />
        {errors.map((error, index) => (
          <span key={index} className="text-sm text-red-500 px-1 ">
            {error}
          </span>
        ))}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
