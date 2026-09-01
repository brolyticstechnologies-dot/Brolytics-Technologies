"use client";

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/admin/form-fields';
import { Upload, Loader2, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspect?: 'video' | 'square' | 'auto';
  className?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  aspect = 'video',
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Upload failed');
        return;
      }

      onChange(data.url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const previewHeight =
    aspect === 'square' ? 'h-36 w-36' :
    aspect === 'auto' ? 'h-24 min-w-[120px]' :
    'h-36 w-full max-w-xs';

  return (
    <FieldGroup label={label} className={className}>
      <div className="space-y-3">
        {value ? (
          <div className={cn('relative rounded-xl overflow-hidden border border-silver-200 bg-silver-50 inline-block', previewHeight)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className={cn(
                'h-full w-full',
                aspect === 'auto' ? 'object-contain p-2' : 'object-cover'
              )}
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/90 border border-silver-200 text-silver-500 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
              aria-label="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div
            className={cn(
              'flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-silver-200 bg-silver-50/50 text-silver-400',
              previewHeight
            )}
          >
            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-xs">No image</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              e.target.value = '';
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="rounded-xl"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>

        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL / path (e.g. /logo.png)"
          className="rounded-xl text-sm"
        />

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </FieldGroup>
  );
}
