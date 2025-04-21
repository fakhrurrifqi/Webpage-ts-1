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
      <label htmlFor={id} className="text-md text-card-foreground mb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className="border-input placeholder:text-muted-foreground text-foreground focus-visible:ring-ring w-full rounded-md border p-3 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer focus:outline-none"
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
