'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Globe,
  Smartphone,
  Bot,
  Code,
  Palette,
  Megaphone,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { submitSlotBooking, type SlotBookingInput } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const servicesList = [
  { id: 'website-development', label: 'Website Development', icon: Globe },
  { id: 'mobile-app-development', label: 'Mobile App Development', icon: Smartphone },
  { id: 'custom-software', label: 'Custom Software / ERP / SaaS', icon: Code },
  { id: 'ai-services', label: 'AI Solutions & LLM Agents', icon: Bot },
  { id: 'graphics-design', label: 'UI/UX & Brand Design', icon: Palette },
  { id: 'seo-marketing', label: 'SEO & Growth Marketing', icon: Megaphone },
  { id: 'general-consultation', label: 'General Tech Consultation', icon: Layers },
];

const timeSlots = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
];

const meetingModes = [
  { id: 'Google Meet', label: 'Google Meet (Video)', icon: Video },
  { id: 'Phone Call', label: 'Phone Call', icon: Phone },
  { id: 'Zoom', label: 'Zoom Video', icon: Video },
];

// Helper to generate the next 10 business days
function getAvailableDates() {
  const dates: { dateStr: string; dayName: string; dayNum: number; monthName: string }[] = [];
  const today = new Date();
  let added = 0;
  let cursor = 1;

  while (added < 10) {
    const d = new Date(today);
    d.setDate(today.getDate() + cursor);
    const dayOfWeek = d.getDay();
    // Exclude Sundays (0)
    if (dayOfWeek !== 0) {
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const dateStr = `${dayName}, ${dayNum} ${monthName} ${d.getFullYear()}`;
      dates.push({ dateStr, dayName, dayNum, monthName });
      added++;
    }
    cursor++;
  }
  return dates;
}

export function BookSlotForm() {
  const availableDates = getAvailableDates();
  const [selectedService, setSelectedService] = useState(servicesList[0].label);
  const [selectedMode, setSelectedMode] = useState('Google Meet');
  const [selectedDate, setSelectedDate] = useState(availableDates[0].dateStr);
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<SlotBookingInput | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: 'Missing Details',
        description: 'Please enter your Name, Email, and Phone Number.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const bookingData: SlotBookingInput = {
      name,
      email,
      phone,
      service: selectedService,
      booking_date: selectedDate,
      booking_time: selectedTime,
      meeting_mode: selectedMode,
      notes,
    };

    try {
      const result = await submitSlotBooking(bookingData);
      if (result.success) {
        setConfirmedBooking(bookingData);
        setIsBooked(true);
        toast({
          title: 'Meeting Scheduled!',
          description: result.message,
        });
      } else {
        toast({
          title: 'Booking Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Booking Failed',
        description: 'Network error. Please try again or WhatsApp us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success View ────────────────────────────────
  if (isBooked && confirmedBooking) {
    const cleanPhone = confirmedBooking.phone.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `Hi Brolytics! I have scheduled a 30-min strategy call for ${confirmedBooking.service} on ${confirmedBooking.booking_date} at ${confirmedBooking.booking_time}. My name is ${confirmedBooking.name}.`
    );

    return (
      <div className="rounded-3xl border border-silver-200/90 bg-white p-8 sm:p-12 shadow-xl text-center max-w-2xl mx-auto animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
          Booking Confirmed
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-silver-900 mt-4 mb-2 tracking-tight">
          Strategy Call Reserved!
        </h3>

        <p className="text-sm sm:text-base text-silver-600 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-bold text-silver-900">{confirmedBooking.name}</span>. Our founding team has received your slot details and will send a meeting invite link to <span className="font-semibold text-primary">{confirmedBooking.email}</span>.
        </p>

        {/* Meeting Ticket */}
        <div className="p-6 rounded-2xl bg-silver-50 border border-silver-200/80 text-left mb-8 space-y-3">
          <div className="flex items-center justify-between border-b border-silver-200 pb-3">
            <span className="text-xs font-bold uppercase text-silver-400">Service</span>
            <span className="text-sm font-bold text-silver-900">{confirmedBooking.service}</span>
          </div>
          <div className="flex items-center justify-between border-b border-silver-200 pb-3">
            <span className="text-xs font-bold uppercase text-silver-400">Date & Time</span>
            <span className="text-sm font-black text-primary">
              {confirmedBooking.booking_date} • {confirmedBooking.booking_time} IST
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-silver-400">Mode</span>
            <span className="text-sm font-semibold text-silver-800 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-primary" /> {confirmedBooking.meeting_mode}
            </span>
          </div>
        </div>

        {/* Immediate WhatsApp Action */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/918507507173?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5" />
            Connect Instantly on WhatsApp (+91 85075 07173)
          </a>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsBooked(false);
              setConfirmedBooking(null);
            }}
            className="text-xs text-silver-500 hover:text-silver-900"
          >
            Book Another Slot
          </Button>
        </div>
      </div>
    );
  }

  // ── Booking Form View ────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-silver-200/90 bg-white p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden"
    >
      {/* ── Wizard Step Navigation ── */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-silver-100 gap-2">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={cn(
            "flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors",
            currentStep === 1
              ? "text-primary"
              : currentStep > 1
              ? "text-silver-900 hover:text-primary cursor-pointer"
              : "text-silver-400"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full text-xs font-black transition-all shrink-0",
              currentStep === 1
                ? "bg-primary text-white ring-4 ring-primary/15"
                : currentStep > 1
                ? "bg-emerald-600 text-white"
                : "bg-silver-200 text-silver-600"
            )}
          >
            {currentStep > 1 ? "✓" : "1"}
          </span>
          <span className="hidden sm:inline">Choose Service</span>
          <span className="sm:hidden">Service</span>
        </button>

        <div
          className={cn(
            "flex-1 h-0.5 mx-1.5 sm:mx-3 transition-colors",
            currentStep >= 2 ? "bg-primary" : "bg-silver-200"
          )}
        />

        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className={cn(
            "flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors",
            currentStep === 2
              ? "text-primary"
              : currentStep > 2
              ? "text-silver-900 hover:text-primary cursor-pointer"
              : "text-silver-400"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full text-xs font-black transition-all shrink-0",
              currentStep === 2
                ? "bg-primary text-white ring-4 ring-primary/15"
                : currentStep > 2
                ? "bg-emerald-600 text-white"
                : "bg-silver-200 text-silver-600"
            )}
          >
            {currentStep > 2 ? "✓" : "2"}
          </span>
          <span className="hidden sm:inline">Date & Time</span>
          <span className="sm:hidden">Schedule</span>
        </button>

        <div
          className={cn(
            "flex-1 h-0.5 mx-1.5 sm:mx-3 transition-colors",
            currentStep === 3 ? "bg-primary" : "bg-silver-200"
          )}
        />

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className={cn(
            "flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors",
            currentStep === 3 ? "text-primary" : "text-silver-400"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full text-xs font-black transition-all shrink-0",
              currentStep === 3
                ? "bg-primary text-white ring-4 ring-primary/15"
                : "bg-silver-200 text-silver-600"
            )}
          >
            3
          </span>
          <span className="hidden sm:inline">Your Details</span>
          <span className="sm:hidden">Details</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* ── Step 1: Select Service ── */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-base font-bold text-silver-900 block mb-1">
                What are you looking to build or discuss?
              </Label>
              <p className="text-xs sm:text-sm text-silver-500 mb-4">
                Select the service area that best matches your project goal.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {servicesList.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedService === srv.label;
                  return (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => setSelectedService(srv.label)}
                      className={cn(
                        'flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-200',
                        isSelected
                          ? 'border-primary bg-primary/[0.04] text-primary ring-2 ring-primary/20 shadow-xs'
                          : 'border-silver-200 bg-silver-50/60 hover:bg-white hover:border-silver-300 text-silver-700'
                      )}
                    >
                      <Icon className={cn('w-4 h-4 mb-2', isSelected ? 'text-primary' : 'text-silver-400')} />
                      <span className="text-xs font-bold leading-tight line-clamp-2">{srv.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-silver-100 gap-3">
              <span className="text-xs text-silver-500">
                Selected: <strong className="text-silver-900 font-bold">{selectedService}</strong>
              </span>
              <Button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="rounded-xl px-5 py-2.5 bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary/90 shadow-md shadow-primary/20 gap-2 shrink-0"
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Date & Time Picker ── */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-2">
              <div>
                <Label className="text-base font-bold text-silver-900 block">
                  Select Preferred Date & Time (IST)
                </Label>
                <p className="text-xs sm:text-sm text-silver-500">
                  Pick a convenient slot for your 30-minute founder consultation.
                </p>
              </div>
              <span className="text-xs font-semibold text-silver-500 hidden sm:flex items-center gap-1 bg-silver-50 px-2.5 py-1 rounded-full border border-silver-200">
                <Clock className="w-3.5 h-3.5 text-primary" /> 30-Min Strategy Call
              </span>
            </div>

            {/* Date Slider Pills */}
            <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.dateStr;
                return (
                  <button
                    type="button"
                    key={item.dateStr}
                    onClick={() => setSelectedDate(item.dateStr)}
                    className={cn(
                      'flex-shrink-0 flex flex-col items-center justify-center w-20 py-3 rounded-2xl border text-center transition-all duration-200',
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-md shadow-primary/20 scale-[1.03]'
                        : 'border-silver-200 bg-white text-silver-700 hover:border-silver-300 hover:bg-silver-50'
                    )}
                  >
                    <span className={cn('text-xs uppercase font-bold', isSelected ? 'text-white/80' : 'text-silver-400')}>
                      {item.dayName}
                    </span>
                    <span className="text-lg font-black leading-tight my-0.5">{item.dayNum}</span>
                    <span className={cn('text-xs font-semibold', isSelected ? 'text-white/80' : 'text-silver-400')}>
                      {item.monthName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            <div>
              <span className="text-xs font-bold text-silver-600 mb-2 block">Available Time Slots (IST):</span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        'py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all',
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-xs'
                          : 'border-silver-200 bg-silver-50/80 text-silver-700 hover:bg-white hover:border-silver-300'
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meeting Mode Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-4 border-t border-silver-100">
              <span className="text-xs font-bold text-silver-600 self-start sm:self-center mr-2">Meeting Platform:</span>
              <div className="flex flex-wrap gap-2">
                {meetingModes.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedMode === mode.id;
                  return (
                    <button
                      type="button"
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all',
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-silver-200 bg-white text-silver-600 hover:border-silver-300'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-silver-100 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="rounded-xl border-silver-200 text-silver-700 hover:bg-silver-50 text-xs sm:text-sm font-semibold gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="rounded-xl px-5 py-2.5 bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary/90 shadow-md shadow-primary/20 gap-2 shrink-0"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Client Details ── */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            {/* Slot Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-silver-50 border border-silver-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-silver-900">
                  {selectedService} • {selectedDate.split(',')[0]}, {selectedTime} IST
                </p>
                <p className="text-silver-500">Platform: {selectedMode}</p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-primary font-bold hover:underline self-start sm:self-center"
              >
                Change Slot
              </button>
            </div>

            <div>
              <Label className="text-base font-bold text-silver-900 block mb-1">
                Your Contact Information
              </Label>
              <p className="text-xs sm:text-sm text-silver-500 mb-4">
                We will send the calendar invitation and meeting link to these details.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label htmlFor="slot-name" className="text-xs font-semibold text-silver-700">
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="slot-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="h-11 rounded-xl bg-white border-silver-200 text-sm focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="slot-email" className="text-xs font-semibold text-silver-700">
                    Work / Personal Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="slot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@company.com"
                    className="h-11 rounded-xl bg-white border-silver-200 text-sm focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="slot-phone" className="text-xs font-semibold text-silver-700">
                    Phone / WhatsApp <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="slot-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-11 rounded-xl bg-white border-silver-200 text-sm focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slot-notes" className="text-xs font-semibold text-silver-700">
                  Brief Project Notes or Agenda <span className="text-silver-400 text-xs">(Optional)</span>
                </Label>
                <Textarea
                  id="slot-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us a little bit about what you want to achieve or any specific questions..."
                  className="rounded-xl bg-white border-silver-200 text-sm min-h-20 resize-none focus:border-primary"
                />
              </div>
            </div>

            {/* Navigation & Submit */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="rounded-xl border-silver-200 text-silver-700 hover:bg-silver-50 text-xs sm:text-sm font-semibold gap-1.5 w-full sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 w-full sm:w-auto h-auto min-h-[48px] py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm sm:text-base shadow-xl shadow-primary/25 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 whitespace-normal"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2 shrink-0">
                      <Sparkles className="w-4 h-4 animate-spin shrink-0" />
                      Reserving Your Slot...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-center leading-snug w-full">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span>Confirm & Book Strategy Slot</span>
                      <span className="inline-block text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-full bg-white/20 whitespace-nowrap">
                        for {selectedDate.split(',')[0]}, {selectedTime}
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 hidden sm:inline-block" />
                    </span>
                  )}
                </Button>
              </div>

              <p className="text-xs text-silver-400 text-center mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Free consultation • No obligations • NDA-protected discussion
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
