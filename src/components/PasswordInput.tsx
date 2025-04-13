import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useState } from "react";

type PasswordInputProps<T extends FieldValues> = {
  id: string;
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
};

const PasswordInput = <T extends FieldValues>({
  id,
  label,
  register,
  name,
  error,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-md mb-1 block text-gray-600 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className="w-full rounded-md border border-gray-300 p-3 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 focus:outline-none dark:text-gray-300"
          aria-label="Toggle password visibility"
        >
          <span className="material-symbols-outlined text-lg">
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      {error && <p className="mt-1 text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default PasswordInput;
