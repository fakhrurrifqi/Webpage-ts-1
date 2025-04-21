import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type EmailInputProps<T extends FieldValues> = {
  id: string;
  label: string;
  register?: UseFormRegister<T>;
  name?: Path<T>;
  error?: string;
  value?: string;
  readonly?: boolean;
};

const EmailInput = <T extends FieldValues>({
  id,
  label,
  register,
  name,
  value,
  readonly,
  error,
}: EmailInputProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="text-md text-card-foreground mb-1 block">
        {label}
      </label>
      <input
        id={id}
        type="email"
        {...(register && name && !readonly ? register(name) : {})}
        value={value}
        readOnly={readonly}
        className="border-input placeholder:text-muted-foreground text-foreground focus-visible:ring-ring w-full rounded-md border p-3 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default EmailInput;
