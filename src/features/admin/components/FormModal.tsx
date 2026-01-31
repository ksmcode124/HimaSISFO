/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { z, ZodError } from 'zod';
import { BaseModal } from '@/components/ui/base-modal';
import { ChevronDown } from 'lucide-react';
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
  const [uploadingFields, setUploadingFields] = useState<Set<string>>(new Set());

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
      setUploadingFields(new Set());
    }
  }, [open, initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: [] }));
  };

  const getErrorMessage = (fieldName: string) => errors[fieldName]?.[0] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submit if still uploading
    if (uploadingFields.size > 0) {
      setServerError('Silakan tunggu sampai upload selesai sebelum submit');
      return;
    }
    
    setErrors({});
    setServerError('');
    setSuccess(false);

    try {
      console.log('Form data before submit:', formData);
      const parsedData = schema.parse(formData);
      console.log('Parsed data:', parsedData);
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
    // previews can come from local object URLs (filePreviews) or hosted URLs stored in formData
    const localPreviews = filePreviews[field.name] || [];
    const files = fileObjects[field.name] || [];
    const progresses = fileProgresses[field.name] || [];
    const isUploading = uploadingFields.has(field.name);

    const { startUpload } = useUploadThing('imageUploader', {
      onClientUploadComplete: (uploaded: any[]) => {
        console.log('Upload complete for field:', field.name, 'Result:', uploaded);
        // store uploaded file info/URLs to formData
        handleChange(field.name, uploaded);

        // build hosted URL previews from upload result
        const hostedPreviews = uploaded.map((u: any) => {
          if (!u) return '';
          if (typeof u === 'string') return u;
          return u.url || u.fileUrl || u.fileUrlFull || u.file?.url || '';
        }).filter(Boolean);

        // set previews to hosted URLs so user can see them before submit
        setFilePreviews(prev => ({ ...prev, [field.name]: hostedPreviews }));

        // clear local file objects but keep hosted previews
        setFileObjects(prev => ({ ...prev, [field.name]: [] }));
        setFileProgresses(prev => ({ ...prev, [field.name]: [] }));

        setUploadingFields(prev => {
          const next = new Set(prev);
          next.delete(field.name);
          return next;
        });
      },
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: field.accept ? { [field.accept]: [] } : { "image/*": [], "video/*": [] },
      multiple: field.multiple,
      disabled: isUploading,
      onDrop: (droppedFiles: File[]) => {
        setFileObjects(prev => ({ ...prev, [field.name]: droppedFiles }));
        setFilePreviews(prev => ({ ...prev, [field.name]: droppedFiles.map((f: File) => URL.createObjectURL(f)) }));
        setFileProgresses(prev => ({ ...prev, [field.name]: droppedFiles.map(() => 0) }));
        // Mark as uploading
        setUploadingFields(prev => new Set([...prev, field.name]));

        // Start upload immediately and await its completion to keep state predictable.
        (async () => {
          try {
            await startUpload(droppedFiles);
            // onClientUploadComplete will handle setting formData, previews and clearing uploadingFields
          } catch (err) {
            console.error('upload error for field', field.name, err);
            setUploadingFields(prev => {
              const next = new Set(prev);
              next.delete(field.name);
              return next;
            });
            setServerError('Gagal mengunggah file. Silakan coba lagi.');
          }
        })();
      },
    });

    // If upload already completed, `formData[field.name]` might contain uploaded result
    const uploadedData = (formData as any)[field.name];
    const uploadedPreviews: string[] = Array.isArray(uploadedData)
      ? uploadedData.map((u: any) => (typeof u === 'string' ? u : (u.url || u.fileUrl || u.fileUrlFull || u.file?.url || ''))).filter(Boolean)
      : [];

    // prefer local previews (object URLs) if present, otherwise show uploaded hosted previews
    const previews = localPreviews.length > 0 ? localPreviews : uploadedPreviews;

    return (
      <div className="space-y-3">
        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input {...getInputProps()} disabled={field.disabled || isUploading} />
          {!previews.length ? (
            <p className="text-gray-600">
              {isUploading ? 'Sedang upload...' : `Drag & drop atau klik untuk memilih file${field.multiple ? ' (multiple)' : ''}`}
            </p>
          ) : (
            <div className="space-y-4">
              {previews.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* When rendering uploaded previews we may not have the original File object. */}
                  {files[i]?.type?.startsWith('image/') || !files[i] ? (
                    <Image src={p} alt={files[i]?.name || 'file'} width={400} height={200} className="max-h-40 rounded" />
                  ) : (
                    <video src={p} controls className="max-h-40 rounded" />
                  )}
                  <p className="text-sm mt-1">{files[i]?.name || ''}</p>
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
      </div>
    );
  };



  const renderField = (field: FormField) => {
    const base =
      'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3385FF] transition-all placeholder:text-[#D9D9D9]';
    const errorCls = getErrorMessage(field.name) ? 'border-red-500' : 'border-gray-200';
    const disabledCls =
      field.disabled || loading ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white';

    const classes = `${base} ${errorCls} ${disabledCls}`;

    const value = formData[field.name as keyof FormData] ?? '';

    switch (field.type) {
      /* ================= TEXTAREA ================= */
      case 'textarea':
        return (
          <textarea
            className={`${classes} resize-none`}
            rows={field.rows || 3}
            placeholder={field.placeholder}
            value={value as string}
            onChange={e => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      /* ================= SELECT ================= */
      case 'select':
        return (
          <div className="relative">
            <select
              className={`${classes} appearance-none pr-10 cursor-pointer`}
              value={value as string}
              onChange={e => handleChange(field.name, e.target.value)}
              disabled={field.disabled || loading}
              multiple={field.multiple}
            >
              {!field.multiple && (
                <option value="">{field.placeholder || 'Pilih opsi'}</option>
              )}
              {field.options?.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      /* ================= FILE ================= */
      case 'file':
        return (
          <FileUploader
            field={field}
          />
        );

      /* ================= NUMBER ================= */
      case 'number':
        return (
          <input
            type="number"
            className={classes}
            placeholder={field.placeholder}
            value={value}
            onChange={e =>
              handleChange(
                field.name,
                e.target.value === '' ? undefined : Number(e.target.value)
              )
            }
            disabled={field.disabled || loading}
          />
        );

      /* ================= DATE ================= */
      case 'date':
        return (
          <input
            type="date"
            className={classes}
            value={value as string}
            onChange={e => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      /* ================= EMAIL ================= */
      case 'email':
        return (
          <input
            type="email"
            className={classes}
            placeholder={field.placeholder || 'email@example.com'}
            value={value as string}
            onChange={e => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      /* ================= PASSWORD ================= */
      case 'password':
        return (
          <input
            type="password"
            className={classes}
            placeholder={field.placeholder || '••••••••'}
            value={value as string}
            onChange={e => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      /* ================= URL ================= */
      case 'url':
        return (
          <input
            type="url"
            className={classes}
            placeholder={field.placeholder || 'https://'}
            value={value as string}
            onChange={e => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );

      /* ================= DEFAULT (TEXT) ================= */
      default:
        return (
          <input
            type="text"
            className={classes}
            placeholder={field.placeholder}
            value={value as string}
            onChange={e => handleChange(field.name, e.target.value)}
            disabled={field.disabled || loading}
          />
        );
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
              <div className="flex justify-center pt-4">
                <button type="submit" disabled={loading || uploadingFields.size > 0} className="px-8 py-2.5 bg-[#3385FF] w-full text-white rounded-lg font-medium hover:bg-[#2670E8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                  {loading ? 'Menyimpan...' : uploadingFields.size > 0 ? 'Tunggu upload selesai...' : submitLabel}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}