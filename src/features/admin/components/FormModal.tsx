/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from 'react';
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
  type?: 'text' | 'textarea' | 'editor' | 'file' | 'select' | 'number' | 'email' | 'password' | 'date' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  side?: 'left' | 'right';
  multiple?: boolean;
  options?: SelectOption[];
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

type FileState = {
  local: File[];
  uploaded: string[];
  uploading: boolean;
};


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
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const editorRefs = useRef<Record<string, any>>({}); // key = field.name

  const [fileState, setFileState] = useState<Record<string, FileState>>({});

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setFormData(initialData);
      setErrors({});
      setServerError('');
      setSuccess(false);
      const initialFileState: Record<string, FileState> = {};
      fields.filter(f => f.type === 'file').forEach(f => {
        const existing: any = initialData[f.name as keyof FormData];
        initialFileState[f.name] = {
          local: [],
          uploaded: Array.isArray(existing) ? existing : existing ? [existing] : [],
          uploading: false,
        };
      });
      setFileState(initialFileState);
    }
  }, [open, initialData, fields]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: [] }));
  };

  const getErrorMessage = (fieldName: string) => errors[fieldName]?.[0] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submit if any file still uploading
    const uploadingAny = Object.values(fileState).some(f => f.uploading);
    if (uploadingAny) {
      setServerError('Tunggu sampai semua file selesai diupload');
      return;
    }

    setErrors({});
    setServerError('');
    setSuccess(false);

    try {
      // convert file fields to uploaded URLs
      const dataToSubmit: Record<string, any> = { ...formData };
      Object.keys(fileState).forEach(key => {
        if (fileState[key]?.uploaded) {
          dataToSubmit[key] = fileState[key].uploaded;
        }
      });

      // TinyMCE
      fields.filter(f => f.type === 'editor').forEach(f => {
        const content = editorRefs.current[f.name]?.getContent() || '';
        formData[f.name as keyof FormData] = content;
      });


      const parsed = schema.parse(dataToSubmit);
      setLoading(true);
      await onSubmit(parsed);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
      }, 1200);
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted: FormErrors = {};
        err.issues.forEach(i => {
          const path = i.path[0] as string;
          if (!formatted[path]) formatted[path] = [];
          formatted[path].push(i.message);
        });
        setErrors(formatted);
      } else if (err instanceof Error) {
        setServerError(err.message || 'Terjadi kesalahan');
      } else {
        setServerError('Terjadi kesalahan tidak diketahui');
      }
    } finally {
      setLoading(false);
    }
  };

  const FileUploader = ({ field }: { field: FormField }) => {
    const state = fileState[field.name] || { local: [], uploaded: [], uploading: false };
    const { startUpload } = useUploadThing('imageUploader', {
      onClientUploadComplete: (uploaded: any[]) => {
        const urls = uploaded.map(u => (typeof u === 'string' ? u : u.url || '')).filter(Boolean);
        setFileState(prev => ({
          ...prev,
          [field.name]: { ...prev[field.name], uploaded: urls, local: [], uploading: false },
        }));
      },
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: { 'image/*': [] },
      multiple: field.multiple,
      disabled: state.uploading,
      onDrop: async (files: File[]) => {
        setFileState(prev => ({ ...prev, [field.name]: { ...prev[field.name], local: files, uploading: true } }));
        try {
          await startUpload(files);
        } catch {
          setFileState(prev => ({ ...prev, [field.name]: { ...prev[field.name], uploading: false } }));
          setServerError('Gagal mengunggah file');
        }
      },
    });

    const previews = state.local.length
      ? state.local.map(f => URL.createObjectURL(f))
      : state.uploaded;

    return (
      <div className="space-y-3">
        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} ${state.uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input {...getInputProps()} disabled={state.uploading || field.disabled} />
          {!previews.length ? (
            <p className="text-gray-600">{state.uploading ? 'Sedang upload...' : 'Drag & drop atau klik untuk memilih gambar'}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {previews.map((p, i) => (
                <Image key={i} src={p} alt={field.name} width={120} height={80} className="rounded max-h-32 object-contain" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderField = (field: FormField) => {
    const baseCls = 'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3385FF] transition-all placeholder:text-[#D9D9D9]';
    const errorCls = getErrorMessage(field.name) ? 'border-red-500' : 'border-gray-200';
    const disabledCls = field.disabled || loading ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white';
    const classes = `${baseCls} ${errorCls} ${disabledCls}`;
    const value = formData[field.name as keyof FormData] ?? '';

    switch (field.type) {
      case 'textarea':
        return <textarea rows={field.rows || 3} placeholder={field.placeholder} className={`${classes} resize-none`} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
      case 'select':
        return (
          <div className="relative">
            <select className={`${classes} appearance-none pr-10`} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} multiple={field.multiple}>
              {!field.multiple && <option value="">{field.placeholder || 'Pilih opsi'}</option>}
              {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );
      case 'file':
        return <FileUploader field={field} />;
      case 'number':
        return <input type="number" className={classes} placeholder={field.placeholder} value={value} onChange={e => handleChange(field.name, e.target.value === '' ? undefined : Number(e.target.value))} disabled={field.disabled || loading} />;
      case 'date':
        return <input type="date" className={classes} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
      case 'email':
        return <input type="email" className={classes} placeholder={field.placeholder || 'email@example.com'} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
      case 'password':
        return <input type="password" className={classes} placeholder={field.placeholder || '••••••••'} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
      case 'url':
        return <input type="url" className={classes} placeholder={field.placeholder || 'https://'} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
      case 'editor':
        return (
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'default-dev-key'}
            onInit={(evt, editor) => (editorRefs.current[field.name] = editor)}
            initialValue={formData[field.name as keyof FormData] as string || ''}
            init={{
              height: field.rows ? field.rows * 100 : 300,
              menubar: false,
              // plugins: [
              //   'lists link image charmap anchor searchreplace visualblocks fullscreen insertdatetime media table help',
              // ],
              toolbar:
                'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | fullscreen help',
              placeholder: field.placeholder || '',
            }}
          />
        );

      default:
        return <input type="text" className={classes} placeholder={field.placeholder} value={value as string} onChange={e => handleChange(field.name, e.target.value)} disabled={field.disabled || loading} />;
    }
  };

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} size="xl" className="max-w-full sm:max-w-5xl">
      <div className="relative">
        {title && <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>}
        {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">✓ Data berhasil disimpan!</div>}
        {serverError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">✗ {serverError}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-5">
              {fields.filter(f => f.side === 'left').map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{f.label}{f.required && <span className="text-red-500 ml-0.5">*</span>}</label>
                  {renderField(f)}
                  {getErrorMessage(f.name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(f.name)}</p>}
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-5">
              {fields.filter(f => f.side === 'right').map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{f.label}{f.required && <span className="text-red-500 ml-0.5">*</span>}</label>
                  {renderField(f)}
                  {getErrorMessage(f.name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(f.name)}</p>}
                </div>
              ))}
              <div className="bg-white pt-4">
                <button type="submit" disabled={loading || Object.values(fileState).some(f => f.uploading)} className="px-8 py-2.5 bg-[#3385FF] w-full text-white rounded-lg font-medium hover:bg-[#2670E8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                  {loading ? 'Menyimpan...' : Object.values(fileState).some(f => f.uploading) ? 'Tunggu upload selesai...' : submitLabel}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}