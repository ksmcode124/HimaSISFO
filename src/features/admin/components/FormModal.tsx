/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DynamicFormModal.tsx
import { BaseModal } from '@/components/ui/base-modal';
import { X, Upload, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { z, ZodError } from 'zod';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'file' | 'select' | 'number' | 'email' | 'password' | 'date' | 'url';
  placeholder?: string;
  accept?: string;
  maxSize?: string;
  column?: 1 | 2;
  options?: SelectOption[];
  disabled?: boolean;
  rows?: number;
  required?: boolean;
}

interface FormErrors {
  [key: string]: string[];
}

interface FormModalProps<TSchema extends z.ZodType<any, any, any>> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  fields: FormField[];
  schema: TSchema;
  onSubmit: (data: z.infer<TSchema>) => Promise<void>;
  submitLabel?: string;
  initialData?: Partial<z.infer<TSchema>>;
}

export function FormModal<TSchema extends z.ZodType<any, any, any>>({
  open,
  onOpenChange,
  title,
  fields,
  schema,
  onSubmit,
  submitLabel = 'Simpan',
  initialData = {},
}: FormModalProps<TSchema>) {
  type FormData = z.infer<TSchema>;

  const [formData, setFormData] = useState<Partial<FormData>>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setFormData(initialData);
      setErrors({});
      setServerError('');
      setSuccess(false);
      setFileNames({});
    }
  }, [open, initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  const handleFileChange = (name: string, file: File | null) => {
    if (file) {
      setFileNames((prev) => ({ ...prev, [name]: file.name }));
      handleChange(name, file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setSuccess(false);

    try {
      // Client-side validation with Zod
      const parsedData = schema.parse(formData);
      setLoading(true);

      // Call parent onSubmit
      await onSubmit(parsedData);

      // Success
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors
        const formattedErrors: FormErrors = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as string;
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });
        setErrors(formattedErrors);
      } else if (error instanceof Error) {
        setServerError(error.message || 'Terjadi kesalahan saat menyimpan data');
      } else {
        setServerError('Terjadi kesalahan yang tidak diketahui');
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (fieldName: string) => {
    return errors[fieldName]?.[0] || '';
  };

  const renderField = (field: FormField) => {
    const baseInputClasses =
      'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3385FF] transition-all';

    const errorClasses = getErrorMessage(field.name)
      ? 'border-red-500'
      : 'border-gray-200';
    const disabledClasses =
      field.disabled || loading
        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
        : 'bg-white';

    const inputClasses = `${baseInputClasses} ${errorClasses} ${disabledClasses}`;

    const value = formData[field.name as keyof FormData] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={`${inputClasses} resize-none`}
            rows={field.rows || 3}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      case 'select':
        return (
          <div className="relative">
            <select
              className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
              value={value as string}
              onChange={(e) => handleChange(field.name, e.target.value)}
              disabled={field.disabled || loading}
            >
              <option value="">{field.placeholder || 'Pilih opsi'}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      case 'file':
        return (
          <div className="space-y-3">
            {field.maxSize && (
              <div className="text-sm text-gray-600">
                Gambar harus berukuran X * Y
              </div>
            )}
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#3385FF] transition-colors">
              <input
                type="file"
                accept={
                  field.accept ||
                  'image/svg+xml,image/png,image/jpeg,image/webp'
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) =>
                  handleFileChange(field.name, e.target.files?.[0] || null)
                }
                disabled={field.disabled || loading}
              />
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <div className="text-sm text-gray-600">
                  Drag and drop to upload
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  or{' '}
                  <span className="text-[#3385FF] font-medium">
                    Browse Files
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {field.accept?.replace(/image\//g, '').toUpperCase() ||
                    'SVG, PNG, JPG, or WEBp'}{' '}
                  (max. {field.maxSize || '10 MB'})
                </div>
                {(fileNames[field.name] || value) && (
                  <div className="mt-3 text-sm text-gray-700 font-medium">
                    {fileNames[field.name] ||
                      (typeof value === 'string'
                        ? value
                        : (value as File)?.name)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            className={inputClasses}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            className={inputClasses}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      case 'password':
        return (
          <input
            type="password"
            className={inputClasses}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className={inputClasses}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      case 'url':
        return (
          <input
            type="url"
            className={inputClasses}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      default:
        return (
          <input
            type="text"
            className={inputClasses}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );
    }
  };

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} size="lg">
      <div className="relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute -top-2 -right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          disabled={loading}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
            ✓ Data berhasil disimpan!
          </div>
        )}

        {/* Server Error Message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
            ✗ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.column === 1 ? 'col-span-2' : 'col-span-1'}
              >
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-0.5">*</span>
                  )}
                </label>
                {renderField(field)}
                {getErrorMessage(field.name) && (
                  <p className="mt-1 text-sm text-red-500">
                    {getErrorMessage(field.name)}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-[#3385FF] text-white rounded-lg font-medium hover:bg-[#2670E8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Menyimpan...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}