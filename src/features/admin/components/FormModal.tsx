/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react';
import { z, ZodError } from 'zod';
import { BaseModal } from '@/components/ui/base-modal';
import { X, Upload, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useUploadThing } from '@/lib/uploadthing';
import { useDropzone } from 'react-dropzone';

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
  side?: 'left' | 'right';
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  multiple?: boolean;
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
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  // file states lifted to top-level
  const [filePreviews, setFilePreviews] = useState<Record<string, string[]>>({});
  const [fileObjects, setFileObjects] = useState<Record<string, File[]>>({});
  const [fileProgresses, setFileProgresses] = useState<Record<string, number[]>>({});

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (open) {
      setFormData(initialData);
      setErrors({});
      setServerError('');
      setSuccess(false);
      setFilePreviews({});
      setFileObjects({});
      setFileProgresses({});
    }
  }, [open, initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: [] }));
  };

  const getErrorMessage = (fieldName: string) => errors[fieldName]?.[0] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setSuccess(false);

    try {
      const parsedData = schema.parse(formData);
      setLoading(true);
      await onSubmit(parsedData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
      }, 1200);
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted: FormErrors = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as string;
          if (!formatted[path]) formatted[path] = [];
          formatted[path].push(err.message);
        });
        setErrors(formatted);
      } else if (error instanceof Error) {
        setServerError(error.message || 'Terjadi kesalahan');
      } else {
        setServerError('Terjadi kesalahan tidak diketahui');
      }
    } finally {
      setLoading(false);
    }
  };

  const FileUploader = ({
    field,
  }: {
    field: FormField;
  }) => {
    const previews = filePreviews[field.name] || [];
    const files = fileObjects[field.name] || [];
    const progresses = fileProgresses[field.name] || [];

    const { startUpload, isUploading } = useUploadThing('imageUploader', {
      onClientUploadComplete: (uploaded) => {
        handleChange(field.name, uploaded); // store uploaded file info/URLs
        setFileObjects(prev => ({ ...prev, [field.name]: [] }));
        setFilePreviews(prev => ({ ...prev, [field.name]: [] }));
        setFileProgresses(prev => ({ ...prev, [field.name]: [] }));
      },
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: field.accept ? { [field.accept]: [] } : { "image/*": [], "video/*": [] },
      multiple: field.multiple,
      onDrop: (droppedFiles) => {
        setFileObjects(prev => ({ ...prev, [field.name]: droppedFiles }));
        setFilePreviews(prev => ({ ...prev, [field.name]: droppedFiles.map(f => URL.createObjectURL(f)) }));
        setFileProgresses(prev => ({ ...prev, [field.name]: droppedFiles.map(() => 0) }));
      },
    });

    return (
      <div className="space-y-3">
        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
          <input {...getInputProps()} disabled={field.disabled || isUploading} />
          {!previews.length ? (
            <p className="text-gray-600">
              Drag & drop atau klik untuk memilih file{field.multiple ? ' (multiple)' : ''}
            </p>
          ) : (
            <div className="space-y-4">
              {previews.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  {files[i].type.startsWith('image/') ? (
                    <Image src={p} alt={files[i].name} width={400} height={200} className="max-h-40 rounded" />
                  ) : (
                    <video src={p} controls className="max-h-40 rounded" />
                  )}
                  <p className="text-sm mt-1">{files[i].name}</p>
                  {isUploading && (
                    <div className="bg-gray-200 h-2 w-full rounded mt-1">
                      <div className="bg-blue-600 h-2 rounded" style={{ width: `${progresses[i]}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Button to upload */}
        {files.length > 0 && !isUploading && (
          <button
            type="button"
            onClick={() => startUpload(files)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload {files.length > 1 ? 'Files' : 'File'}
          </button>
        )}
      </div>
    );
  };



  const renderField = (field: FormField) => {
    const base = 'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3385FF] transition-all placeholder:text-[#D9D9D9]';
    const errorCls = getErrorMessage(field.name) ? 'border-red-500' : 'border-gray-200';
    const disabledCls = field.disabled || loading ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white';
    const classes = `${base} ${errorCls} ${disabledCls}`;
    const value = formData[field.name as keyof FormData] || '';

    switch (field.type) {
      case 'textarea':
        return <textarea className={`${classes} resize-none`} rows={field.rows || 3} placeholder={field.placeholder} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;

      case 'select':
        return (
          <div className="relative">
            <select className={`${classes} appearance-none pr-10 cursor-pointer`} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading}>
              <option value="">{field.placeholder || 'Pilih opsi'}</option>
              {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      case 'file': {
        return <FileUploader field={field} />;
      }

      default:
        return <input type={field.type || 'text'} className={classes} placeholder={field.placeholder} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
    }
  };

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} size="xl">
      <div className="relative">
        {title && <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>}
        {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">✓ Data berhasil disimpan!</div>}
        {serverError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">✗ {serverError}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-6">
            <div className="flex-1 space-y-5">
              {fields.filter(f => f.side === 'left').map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {f.label}{f.required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  {renderField(f)}
                  {getErrorMessage(f.name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(f.name)}</p>}
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-5">
              {fields.filter(f => f.side === 'right').map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {f.label}{f.required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  {renderField(f)}
                  {getErrorMessage(f.name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(f.name)}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button type="submit" disabled={loading} className="px-8 py-2.5 bg-[#3385FF] text-white rounded-lg font-medium hover:bg-[#2670E8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              {loading ? 'Menyimpan...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
