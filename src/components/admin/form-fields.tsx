"use client";

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export function FieldGroup({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-semibold text-silver-700">{label}</Label>
      {children}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <FieldGroup label={label}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl"
      />
    </FieldGroup>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <FieldGroup label={label}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rounded-xl resize-y"
      />
    </FieldGroup>
  );
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <FieldGroup label={label}>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-xl"
      />
    </FieldGroup>
  );
}

export function SectionHeaderFields({
  header,
  onChange,
}: {
  header: { badge: string; title: string; titleAccent?: string; subtitle: string };
  onChange: (h: typeof header) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 p-4 bg-silver-50 rounded-xl border border-silver-200">
      <TextField label="Badge" value={header.badge} onChange={(v) => onChange({ ...header, badge: v })} />
      <TextField label="Title" value={header.title} onChange={(v) => onChange({ ...header, title: v })} />
      <TextField label="Title Accent" value={header.titleAccent ?? ''} onChange={(v) => onChange({ ...header, titleAccent: v })} />
      <div className="sm:col-span-2">
        <TextAreaField label="Subtitle" value={header.subtitle} onChange={(v) => onChange({ ...header, subtitle: v })} />
      </div>
    </div>
  );
}

export function ArrayItemCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-4 border border-silver-200 rounded-xl bg-white space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-silver-800">{title}</span>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" variant="outline" onClick={onClick} className="w-full rounded-xl border-dashed">
      <Plus className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[] | readonly string[];
}) {
  return (
    <FieldGroup label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 py-2 bg-white border border-silver-200 rounded-xl text-sm font-medium text-silver-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
    </FieldGroup>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-silver-200 bg-silver-50/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-silver-300 text-primary focus:ring-primary cursor-pointer"
      />
      <div>
        <label className="text-sm font-bold text-silver-800 cursor-pointer block leading-none">
          {label}
        </label>
        {description && (
          <p className="text-xs text-silver-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

