"use client";

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas';
import { submitContactForm, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Send, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import type { SiteContent } from '@/lib/content-types';
import { getIcon } from '@/lib/icon-map';

interface ContactFormProps {
  content: SiteContent['contact'];
}

const initialState: FormState = {
  message: '',
  status: 'idle',
};

const ContactItem = ({ icon: Icon, text, href, index }: {
  icon: React.ElementType;
  text: string;
  href: string;
  index: number;
}) => {
  return (
    <a
      href={href}
      className="group relative flex items-center space-x-4 p-5 card-silver rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_18px_40px_-18px_rgba(143,38,71,0.25)] hover:-translate-y-1 transform-gpu"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative flex-shrink-0">
        <div className="relative p-3 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl border border-primary/15 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="h-6 w-6 text-primary transition-all duration-500" />
        </div>
      </div>

      <div className="relative flex-1 min-w-0">
        <p className="text-sm md:text-base text-silver-700 group-hover:text-silver-900 transition-colors duration-500 break-words font-medium">
          {text}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/80 transition-all duration-700" />
    </a>
  );
};

export function ContactForm({ content }: ContactFormProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  const contactDetails = content.details.map(d => ({
    icon: getIcon(d.icon),
    text: d.text,
    href: d.href,
  }));

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error') {
      toast({
        title: "Error Sending Message",
        description: state.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  const inputClass = "bg-white border-silver-200 text-silver-900 placeholder:text-silver-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12 hover:border-silver-300";

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-16 sm:py-24 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50/70 to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-silver-300/45 rounded-full blur-[120px] animate-aurora-drift" />
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(hsl(214_32%_91%/.35)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.35)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          ""
        )}>
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">{content.badge}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-silver tracking-tight mb-5">{content.title}</h2>
          <div className="hairline w-16 h-px mx-auto mb-6" />
          <p className="text-silver-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact info */}
          <div className={cn(
            "transition-all duration-1000 delay-300",
            ""
          )}>
            <div className="relative mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-silver mb-4 leading-tight">
                {content.sideTitle}
              </h3>
              <div className="relative w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6" />
              <p className="text-base md:text-lg text-silver-500 leading-relaxed">
                {content.sideDescription}
              </p>
            </div>

            <div className="space-y-5">
              {contactDetails.map((item, index) => (
                <ContactItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  href={item.href}
                  index={index}
                />
              ))}
            </div>

            <div className={cn(
              "mt-8 transition-all duration-1000 delay-700",
              ""
            )}>
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-white border border-silver-200 rounded-full shadow-sm text-center">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-silver-600 font-medium text-sm">
                  We typically respond within <span className="text-primary font-bold">{content.responseTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={cn(
            "transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            {state.status === 'success' ? (
              <div className="relative p-6 sm:p-10 card-silver rounded-3xl overflow-hidden text-center bg-white shadow-xl animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
                  <Sparkles className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  Message Sent Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-silver-900 mt-4 mb-2 tracking-tight">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm sm:text-base text-silver-600 mb-8 max-w-md mx-auto leading-relaxed">
                  Your message has been safely recorded in our system and notified to our founding team. We will review your project requirements and reply within 24 hours.
                </p>

                {/* Instant Actions */}
                <div className="space-y-3 max-w-md mx-auto">
                  <a
                    href="https://wa.me/918507507173?text=Hi%20Brolytics%20Technologies%2C%20I%20just%20submitted%20a%20message%20on%20your%20website%20and%20would%20like%20to%20discuss%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02]"
                  >
                    <span>💬 Chat on WhatsApp with Founders</span>
                  </a>

                  <a
                    href="/book-a-slot"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-silver-900 hover:bg-black text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <span>📅 Or Book a Dedicated 30-Min Strategy Slot</span>
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit((data) => {
                  const formData = new FormData();
                  Object.keys(data).forEach(key => {
                    formData.append(key, (data as any)[key]);
                  });
                  formAction(formData);
                })}
                className="relative p-5 sm:p-8 card-silver rounded-2xl overflow-hidden"
                id="contact-thivolve-form"
              >
                {/* Top accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="relative z-10 space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-silver-700 flex items-center gap-2">
                      Full Name
                      <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      className={inputClass}
                      placeholder="Enter your full name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-primary mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-silver-700 flex items-center gap-2">
                        Email Address
                        <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-primary mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-silver-700 flex items-center gap-2">
                        Phone Number
                        <span className="text-silver-400 text-xs">(Optional)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register('phone')}
                        className={inputClass}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-primary mt-1">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-silver-700 flex items-center gap-2">
                      Message
                      <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      {...form.register('message')}
                      className="bg-white border-silver-200 text-silver-900 placeholder:text-silver-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 rounded-xl min-h-36 resize-none hover:border-silver-300"
                      placeholder="Tell us about your project or inquiry..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-primary mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="group relative w-full bg-primary hover:bg-primary text-white font-bold text-base py-6 rounded-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/35 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden mt-6"
                    disabled={form.formState.isSubmitting}
                  >
                    <div className="relative flex items-center justify-center space-x-2">
                      <span>{form.formState.isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      {!form.formState.isSubmitting && (
                        <Send className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110" />
                      )}
                    </div>

                    {form.formState.isSubmitting && (
                      <div className="absolute right-4 flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
