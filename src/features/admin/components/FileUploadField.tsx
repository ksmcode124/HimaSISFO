 
'use client'

import { useDropzone } from 'react-dropzone';
import { useUploadThing } from '@/lib/uploadthing';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';

interface FileUploaderProps {
  field: {
    name: string;
    accept?: string;
    multiple?: boolean;
    maxSize?: string;
  };
  value?: string; // Comma-separated URLs or single URL
  onChange: (value: string) => void;
  disabled?: boolean;
  filePreviews: Record<string, string[]>;
  fileObjects: Record<string, File[]>;
  fileProgresses: Record<string, number[]>;
  setFilePreviews: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setFileObjects: React.Dispatch<React.SetStateAction<Record<string, File[]>>>;
  setFileProgresses: React.Dispatch<React.SetStateAction<Record<string, number[]>>>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  field,
  value = '',
  onChange,
  disabled = false,
  filePreviews,
  fileObjects,
  fileProgresses,
  setFilePreviews,
  setFileObjects,
  setFileProgresses,
}) => {
  const maxSizeBytes = field.maxSize ? parseFloat(field.maxSize) * 1024 * 1024 : 1024 * 1024; // Default 1MB
  
  // Parse uploaded URLs from string value
  const uploadedUrls = value ? value.split(',').filter(Boolean) : [];
  
  const previews = filePreviews[field.name] || [];
  const files = fileObjects[field.name] || [];
  const progresses = fileProgresses[field.name] || [];

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (uploaded) => {
      if (!uploaded) return;

      // Extract URLs from uploaded files
      const newUrls = uploaded.map(file => file.url);
      
      // Combine with existing URLs (if multiple allowed)
      const updatedUrls = field.multiple 
        ? [...uploadedUrls, ...newUrls]
        : newUrls; // If not multiple, replace with latest

      // Save as comma-separated string
      onChange(updatedUrls.join(','));

      // Clear pending state
      setFileObjects(prev => ({ ...prev, [field.name]: [] }));
      setFilePreviews(prev => ({ ...prev, [field.name]: [] }));
      setFileProgresses(prev => ({ ...prev, [field.name]: [] }));
    },
    onUploadError: (error) => {
      console.error('Upload error:', error);
      // Clear pending state on error
      setFileObjects(prev => ({ ...prev, [field.name]: [] }));
      setFilePreviews(prev => ({ ...prev, [field.name]: [] }));
      setFileProgresses(prev => ({ ...prev, [field.name]: [] }));
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: field.accept ? { [field.accept]: [] } : { 
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: field.multiple,
    maxSize: maxSizeBytes,
    onDrop: (acceptedFiles, rejectedFiles) => {
      // Validate file size explicitly (dropzone sometimes passes through)
      const validFiles = acceptedFiles.filter(file => {
        if (file.size > maxSizeBytes) {
          alert(`File ${file.name} terlalu besar. Maksimal ${field.maxSize || '1'}MB`);
          return false;
        }
        return true;
      });

      if (rejectedFiles.length > 0) {
        const reasons = rejectedFiles.map(r => {
          if (r.errors[0]?.code === 'file-too-large') {
            return `${r.file.name}: Ukuran terlalu besar (max ${field.maxSize || '1'}MB)`;
          }
          if (r.errors[0]?.code === 'file-invalid-type') {
            return `${r.file.name}: Format file tidak didukung`;
          }
          return `${r.file.name}: File ditolak`;
        });
        alert('File ditolak:\n' + reasons.join('\n'));
        return;
      }

      if (validFiles.length === 0) return;

      // Store files
      setFileObjects(prev => ({ ...prev, [field.name]: validFiles }));
      setFileProgresses(prev => ({ ...prev, [field.name]: validFiles.map(() => 0) }));

      // Generate previews
      const newPreviews = validFiles.map(f => URL.createObjectURL(f));
      setFilePreviews(prev => ({ ...prev, [field.name]: newPreviews }));
    },
    disabled: disabled || isUploading,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    await startUpload(files);
  };

  const removeUploadedUrl = (index: number) => {
    const updated = uploadedUrls.filter((_, i) => i !== index);
    onChange(updated.join(','));
  };

  const removePendingFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke object URL to free memory
    URL.revokeObjectURL(previews[index]);
    
    setFileObjects(prev => ({ ...prev, [field.name]: updatedFiles }));
    setFilePreviews(prev => ({ ...prev, [field.name]: updatedPreviews }));
    setFileProgresses(prev => ({ 
      ...prev, 
      [field.name]: updatedFiles.map(() => 0) 
    }));
  };

  return (
    <div className="space-y-3">
      {/* Show uploaded files */}
      {uploadedUrls.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">File Terupload:</p>
          <div className="grid grid-cols-2 gap-2">
            {uploadedUrls.map((url, index) => (
              <div key={url} className="relative group">
                <Image 
                  src={url} 
                  alt={`Uploaded ${index + 1}`} 
                  width={200} 
                  height={200}
                  className="w-full h-32 object-cover rounded-lg border-2 border-green-200" 
                />
                <button
                  type="button"
                  onClick={() => removeUploadedUrl(index)}
                  disabled={disabled}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dropzone area */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        } ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
      >
        <input {...getInputProps()} disabled={disabled || isUploading} />
        
        {previews.length === 0 ? (
          <div className="py-4">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              {isDragActive ? 'Lepaskan file di sini' : 'Drag & drop atau klik untuk memilih'}
            </p>
            <p className="text-xs text-gray-500">
              {field.multiple ? 'Multiple files' : 'Single file'} • Max {field.maxSize || '1'}MB • SVG, WebP, PNG, JPEG
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {previews.map((preview, index) => (
                <div key={`preview-${index}`} className="relative">
                  <Image 
                    src={preview} 
                    alt={files[index]?.name || ''} 
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePendingFile(index);
                    }}
                    disabled={isUploading}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs mt-1 truncate text-gray-700">{files[index]?.name}</p>
                  
                  {isUploading && progresses[index] !== undefined && (
                    <div className="mt-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${progresses[index]}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload button */}
      {files.length > 0 && !isUploading && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={disabled}
          className="w-full bg-[#3385FF] text-white py-2.5 rounded-lg hover:bg-[#2670E8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          Upload {files.length} File
        </button>
      )}

      {isUploading && (
        <div className="text-center py-2">
          <p className="text-sm text-gray-600">Mengupload file...</p>
        </div>
      )}
    </div>
  );
};