"use client";

import { useState } from 'react';
import type { SiteContent } from '@/lib/content-types';
import { updateContentSection, updateContentSections, logoutAdmin } from '@/app/actions/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  TextField, TextAreaField, NumberField, SectionHeaderFields,
  ArrayItemCard, AddButton, SelectField, CheckboxField,
} from '@/components/admin/form-fields';
import { ImageUploadField } from '@/components/admin/image-upload-field';
import {
  LayoutDashboard, LogOut, Save, ExternalLink, Home, Users,
  BarChart3, Briefcase, MessageSquare, Settings, Star, Layers,
  BadgeIndianRupee,
} from 'lucide-react';

interface AdminDashboardProps {
  initialContent: SiteContent;
}

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const saveSection = async <K extends keyof SiteContent>(section: K) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const result = await updateContentSection(section, content[section]);
      toast({
        title: result.success ? 'Saved!' : 'Error',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveSections = async (sections: (keyof SiteContent)[]) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const updates = Object.fromEntries(
        sections.map((section) => [section, content[section]])
      ) as Partial<SiteContent>;
      const result = await updateContentSections(updates);
      toast({
        title: result.success ? 'Saved!' : 'Error',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const update = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [section]: data }));
  };

  return (
    <div className="min-h-screen bg-silver-50">
      <header className="sticky top-0 z-50 bg-white border-b border-silver-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-black text-silver-900">Brolytics CMS</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="rounded-xl hidden sm:flex">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </a>
            </Button>
            <form action={logoutAdmin}>
              <Button variant="ghost" size="sm" type="submit" className="rounded-xl text-silver-500">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-white border border-silver-200 p-1.5 rounded-xl">
            <TabsTrigger value="hero" className="rounded-lg text-xs sm:text-sm"><Home className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Hero</TabsTrigger>
            <TabsTrigger value="services" className="rounded-lg text-xs sm:text-sm"><Layers className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Services</TabsTrigger>
            <TabsTrigger value="stats" className="rounded-lg text-xs sm:text-sm"><BarChart3 className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Stats</TabsTrigger>
            <TabsTrigger value="aboutUs" className="rounded-lg text-xs sm:text-sm"><Users className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />About</TabsTrigger>
            <TabsTrigger value="ourWork" className="rounded-lg text-xs sm:text-sm"><Briefcase className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Work</TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-lg text-xs sm:text-sm"><BadgeIndianRupee className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Pricing</TabsTrigger>
            <TabsTrigger value="ourClients" className="rounded-lg text-xs sm:text-sm"><Star className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Clients</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-lg text-xs sm:text-sm"><MessageSquare className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Contact</TabsTrigger>
            <TabsTrigger value="footer" className="rounded-lg text-xs sm:text-sm">Footer</TabsTrigger>
            <TabsTrigger value="aboutPage" className="rounded-lg text-xs sm:text-sm">About Page</TabsTrigger>
            <TabsTrigger value="siteSettings" className="rounded-lg text-xs sm:text-sm"><Settings className="w-3.5 h-3.5 mr-1.5 hidden sm:inline" />Settings</TabsTrigger>
          </TabsList>

          {/* HERO */}
          <TabsContent value="hero">
            <EditorPanel title="Hero Section" onSave={() => saveSection('hero')} saving={isSaving}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Badge" value={content.hero.badge} onChange={(v) => update('hero', { ...content.hero, badge: v })} />
                <TextField label="Title Line 1" value={content.hero.titleLine1} onChange={(v) => update('hero', { ...content.hero, titleLine1: v })} />
                <TextField label="Title Line 3" value={content.hero.titleLine3} onChange={(v) => update('hero', { ...content.hero, titleLine3: v })} />
                <TextField label="Client Count" value={content.hero.clientCount} onChange={(v) => update('hero', { ...content.hero, clientCount: v })} />
                <TextField label="Rating" value={content.hero.rating} onChange={(v) => update('hero', { ...content.hero, rating: v })} />
                <TextField label="Satisfaction" value={content.hero.satisfaction} onChange={(v) => update('hero', { ...content.hero, satisfaction: v })} />
                <TextField label="Primary CTA" value={content.hero.primaryCta} onChange={(v) => update('hero', { ...content.hero, primaryCta: v })} />
                <TextField label="Secondary CTA" value={content.hero.secondaryCta} onChange={(v) => update('hero', { ...content.hero, secondaryCta: v })} />
                <TextField label="Nav CTA" value={content.hero.navCta} onChange={(v) => update('hero', { ...content.hero, navCta: v })} />
              </div>
              <TextAreaField label="Description" value={content.hero.description} onChange={(v) => update('hero', { ...content.hero, description: v })} rows={3} />
              
              <h3 className="font-bold text-silver-800 pt-4">Highlights</h3>
              <div className="space-y-2">
                {content.hero.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <TextField label="" value={h} onChange={(v) => {
                        const hls = [...content.hero.highlights];
                        hls[i] = v;
                        update('hero', { ...content.hero, highlights: hls });
                      }} />
                    </div>
                    <button type="button" onClick={() => {
                      const hls = [...content.hero.highlights];
                      hls.splice(i, 1);
                      update('hero', { ...content.hero, highlights: hls });
                    }} className="text-red-500 text-xs px-2 py-1">X</button>
                  </div>
                ))}
                <AddButton label="Add Highlight" onClick={() => update('hero', { ...content.hero, highlights: [...content.hero.highlights, 'New Highlight'] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-4">Slides</h3>
              <div className="space-y-3">
                {content.hero.slides.map((slide, i) => (
                  <ArrayItemCard key={i} title={`Slide ${i + 1}`} onRemove={() => update('hero', { ...content.hero, slides: content.hero.slides.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Word" value={slide.word} onChange={(v) => { const s = [...content.hero.slides]; s[i] = { ...slide, word: v }; update('hero', { ...content.hero, slides: s }); }} />
                      <TextField label="Alt" value={slide.alt} onChange={(v) => { const s = [...content.hero.slides]; s[i] = { ...slide, alt: v }; update('hero', { ...content.hero, slides: s }); }} />
                      <div className="sm:col-span-2">
                        <ImageUploadField label="Slide Image" value={slide.src} onChange={(v) => { const s = [...content.hero.slides]; s[i] = { ...slide, src: v }; update('hero', { ...content.hero, slides: s }); }} />
                      </div>
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Slide" onClick={() => update('hero', { ...content.hero, slides: [...content.hero.slides, { word: 'New', src: '', alt: '' }] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-4">Proof Points</h3>
              <div className="space-y-3">
                {content.hero.proofPoints.map((p, i) => (
                  <ArrayItemCard key={i} title={`Proof ${i + 1}`} onRemove={() => update('hero', { ...content.hero, proofPoints: content.hero.proofPoints.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Icon" value={p.icon} onChange={(v) => { const pts = [...content.hero.proofPoints]; pts[i] = { ...p, icon: v }; update('hero', { ...content.hero, proofPoints: pts }); }} />
                      <TextField label="Value" value={p.value} onChange={(v) => { const pts = [...content.hero.proofPoints]; pts[i] = { ...p, value: v }; update('hero', { ...content.hero, proofPoints: pts }); }} />
                      <TextField label="Label" value={p.label} onChange={(v) => { const pts = [...content.hero.proofPoints]; pts[i] = { ...p, label: v }; update('hero', { ...content.hero, proofPoints: pts }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Proof Point" onClick={() => update('hero', { ...content.hero, proofPoints: [...content.hero.proofPoints, { icon: 'star', value: '100+', label: 'New Metric' }] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-6">Homepage Text Marquee Ticker</h3>
              <p className="text-xs text-silver-500 mb-2">
                Edit, add or remove the animated scrolling service tags running across the bottom of the hero section.
              </p>
              <div className="space-y-2">
                {(content.hero.marqueeItems ?? [
                  'Website Development',
                  'Mobile App Development',
                  'Custom Software Solutions',
                  'Graphics & UI/UX Design',
                  'SEO & Digital Marketing',
                  'AI & Machine Learning Services',
                ]).map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <TextField
                        label=""
                        value={item}
                        onChange={(v) => {
                          const current = [...(content.hero.marqueeItems ?? [
                            'Website Development',
                            'Mobile App Development',
                            'Custom Software Solutions',
                            'Graphics & UI/UX Design',
                            'SEO & Digital Marketing',
                            'AI & Machine Learning Services',
                          ])];
                          current[i] = v;
                          update('hero', { ...content.hero, marqueeItems: current });
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = [...(content.hero.marqueeItems ?? [
                          'Website Development',
                          'Mobile App Development',
                          'Custom Software Solutions',
                          'Graphics & UI/UX Design',
                          'SEO & Digital Marketing',
                          'AI & Machine Learning Services',
                        ])];
                        current.splice(i, 1);
                        update('hero', { ...content.hero, marqueeItems: current });
                      }}
                      className="text-red-500 text-xs px-2 py-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <AddButton
                  label="Add Marquee Item"
                  onClick={() => {
                    const current = [...(content.hero.marqueeItems ?? [
                      'Website Development',
                      'Mobile App Development',
                      'Custom Software Solutions',
                      'Graphics & UI/UX Design',
                      'SEO & Digital Marketing',
                      'AI & Machine Learning Services',
                    ])];
                    update('hero', { ...content.hero, marqueeItems: [...current, 'New Service Tag'] });
                  }}
                />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* SERVICES */}
          <TabsContent value="services">
            <EditorPanel title="Services" onSave={() => saveSections(['services', 'servicesOverview'])} saving={isSaving}>
              <SectionHeaderFields header={content.servicesOverview.header} onChange={(h) => update('servicesOverview', { ...content.servicesOverview, header: h })} />
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <TextField label="Bottom CTA Title" value={content.servicesOverview.bottomCtaTitle} onChange={(v) => update('servicesOverview', { ...content.servicesOverview, bottomCtaTitle: v })} />
                <TextField label="Bottom CTA Button" value={content.servicesOverview.bottomCtaButton} onChange={(v) => update('servicesOverview', { ...content.servicesOverview, bottomCtaButton: v })} />
                <div className="sm:col-span-2"><TextField label="Bottom CTA Subtitle" value={content.servicesOverview.bottomCtaSubtitle} onChange={(v) => update('servicesOverview', { ...content.servicesOverview, bottomCtaSubtitle: v })} /></div>
              </div>

              <h3 className="font-bold text-silver-800 pt-4">Service Items</h3>
              <div className="space-y-3">
                {content.services.map((svc, i) => (
                  <ArrayItemCard key={i} title={svc.title} onRemove={() => update('services', content.services.filter((_, j) => j !== i))}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Slug" value={svc.slug} onChange={(v) => { const s = [...content.services]; s[i] = { ...svc, slug: v }; update('services', s); }} />
                      <TextField label="Title" value={svc.title} onChange={(v) => { const s = [...content.services]; s[i] = { ...svc, title: v }; update('services', s); }} />
                      <TextField label="Icon" value={svc.icon} onChange={(v) => { const s = [...content.services]; s[i] = { ...svc, icon: v }; update('services', s); }} />
                      <TextField label="Tags (comma sep)" value={(svc.tags ?? []).join(', ')} onChange={(v) => { const s = [...content.services]; s[i] = { ...svc, tags: v.split(',').map(t => t.trim()).filter(Boolean) }; update('services', s); }} />
                      <div className="sm:col-span-2"><TextAreaField label="Description" value={svc.description} onChange={(v) => { const s = [...content.services]; s[i] = { ...svc, description: v }; update('services', s); }} /></div>
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Service" onClick={() => update('services', [...content.services, { slug: 'new-service', title: 'New Service', description: '', icon: 'globe', tags: [] }])} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* STATS */}
          <TabsContent value="stats">
            <EditorPanel title="Stats Section" onSave={() => saveSection('stats')} saving={isSaving}>
              <SectionHeaderFields header={content.stats.header} onChange={(h) => update('stats', { ...content.stats, header: h })} />
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <TextField label="Banner Title" value={content.stats.bannerTitle} onChange={(v) => update('stats', { ...content.stats, bannerTitle: v })} />
                <TextField label="Banner Subtitle" value={content.stats.bannerSubtitle} onChange={(v) => update('stats', { ...content.stats, bannerSubtitle: v })} />
                <TextField label="Satisfaction" value={content.stats.satisfaction} onChange={(v) => update('stats', { ...content.stats, satisfaction: v })} />
                <TextField label="Rating" value={content.stats.rating} onChange={(v) => update('stats', { ...content.stats, rating: v })} />
              </div>
              <h3 className="font-bold text-silver-800 pt-4">Stat Items</h3>
              <div className="space-y-3">
                {content.stats.items.map((stat, i) => (
                  <ArrayItemCard key={i} title={stat.label} onRemove={() => update('stats', { ...content.stats, items: content.stats.items.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <NumberField label="Number" value={stat.end} onChange={(v) => { const items = [...content.stats.items]; items[i] = { ...stat, end: v }; update('stats', { ...content.stats, items }); }} />
                      <TextField label="Label" value={stat.label} onChange={(v) => { const items = [...content.stats.items]; items[i] = { ...stat, label: v }; update('stats', { ...content.stats, items }); }} />
                      <TextField label="Hint" value={stat.hint} onChange={(v) => { const items = [...content.stats.items]; items[i] = { ...stat, hint: v }; update('stats', { ...content.stats, items }); }} />
                      <TextField label="Icon" value={stat.icon} onChange={(v) => { const items = [...content.stats.items]; items[i] = { ...stat, icon: v }; update('stats', { ...content.stats, items }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Stat" onClick={() => update('stats', { ...content.stats, items: [...content.stats.items, { end: 0, label: 'New Stat', hint: '', icon: 'star', plus: true }] })} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* ABOUT US */}
          <TabsContent value="aboutUs">
            <EditorPanel title="About Us + Core Values" onSave={() => saveSections(['aboutUs', 'coreValues'])} saving={isSaving}>
              <SectionHeaderFields header={content.aboutUs.header} onChange={(h) => update('aboutUs', { ...content.aboutUs, header: h })} />
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <ImageUploadField label="About Image" value={content.aboutUs.image} onChange={(v) => update('aboutUs', { ...content.aboutUs, image: v })} />
                <TextField label="Image Alt" value={content.aboutUs.imageAlt} onChange={(v) => update('aboutUs', { ...content.aboutUs, imageAlt: v })} />
                <TextField label="Badge 1" value={content.aboutUs.badge1} onChange={(v) => update('aboutUs', { ...content.aboutUs, badge1: v })} />
                <TextField label="Badge 2" value={content.aboutUs.badge2} onChange={(v) => update('aboutUs', { ...content.aboutUs, badge2: v })} />
                <TextField label="Heading" value={content.aboutUs.heading} onChange={(v) => update('aboutUs', { ...content.aboutUs, heading: v })} />
                <TextField label="Heading Accent" value={content.aboutUs.headingAccent} onChange={(v) => update('aboutUs', { ...content.aboutUs, headingAccent: v })} />
                <TextField label="CTA Text" value={content.aboutUs.ctaText} onChange={(v) => update('aboutUs', { ...content.aboutUs, ctaText: v })} />
              </div>
              <h3 className="font-bold text-silver-800 pt-4">Paragraphs</h3>
              <div className="space-y-3">
                {content.aboutUs.paragraphs.map((p, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <TextAreaField label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
                        const paras = [...content.aboutUs.paragraphs];
                        paras[i] = v;
                        update('aboutUs', { ...content.aboutUs, paragraphs: paras });
                      }} rows={3} />
                    </div>
                    <button type="button" onClick={() => {
                      const paras = [...content.aboutUs.paragraphs];
                      paras.splice(i, 1);
                      update('aboutUs', { ...content.aboutUs, paragraphs: paras });
                    }} className="text-red-500 text-xs px-2 py-1 mt-6">X</button>
                  </div>
                ))}
                <AddButton label="Add Paragraph" onClick={() => update('aboutUs', { ...content.aboutUs, paragraphs: [...content.aboutUs.paragraphs, 'New Paragraph'] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-6">Core Values</h3>
              <TextField label="Badge" value={content.coreValues.badge} onChange={(v) => update('coreValues', { ...content.coreValues, badge: v })} />
              <TextField label="Title" value={content.coreValues.title} onChange={(v) => update('coreValues', { ...content.coreValues, title: v })} />
              <TextAreaField label="Subtitle" value={content.coreValues.subtitle} onChange={(v) => update('coreValues', { ...content.coreValues, subtitle: v })} />
              <div className="space-y-3 mt-4">
                {content.coreValues.items.map((val, i) => (
                  <ArrayItemCard key={i} title={val.title} onRemove={() => update('coreValues', { ...content.coreValues, items: content.coreValues.items.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Icon" value={val.icon} onChange={(v) => { const items = [...content.coreValues.items]; items[i] = { ...val, icon: v }; update('coreValues', { ...content.coreValues, items }); }} />
                      <TextField label="Title" value={val.title} onChange={(v) => { const items = [...content.coreValues.items]; items[i] = { ...val, title: v }; update('coreValues', { ...content.coreValues, items }); }} />
                      <div className="sm:col-span-2"><TextAreaField label="Description" value={val.description} onChange={(v) => { const items = [...content.coreValues.items]; items[i] = { ...val, description: v }; update('coreValues', { ...content.coreValues, items }); }} /></div>
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Core Value" onClick={() => update('coreValues', { ...content.coreValues, items: [...content.coreValues.items, { icon: 'star', title: 'New Value', description: '' }] })} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* OUR WORK */}
          <TabsContent value="ourWork">
            <EditorPanel title="Our Work / Portfolio & Case Studies" onSave={() => saveSection('ourWork')} saving={isSaving}>
              <SectionHeaderFields header={content.ourWork.header} onChange={(h) => update('ourWork', { ...content.ourWork, header: h })} />
              <NumberField label="Projects shown on homepage" value={content.ourWork.homeProjectCount} onChange={(v) => update('ourWork', { ...content.ourWork, homeProjectCount: v })} />

              <h3 className="font-bold text-silver-800 pt-4">Achievement Stats</h3>
              <div className="space-y-3">
                {content.ourWork.achievementStats.map((stat, i) => (
                  <ArrayItemCard key={i} title={stat.label} onRemove={() => update('ourWork', { ...content.ourWork, achievementStats: content.ourWork.achievementStats.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Icon" value={stat.icon} onChange={(v) => { const s = [...content.ourWork.achievementStats]; s[i] = { ...stat, icon: v }; update('ourWork', { ...content.ourWork, achievementStats: s }); }} />
                      <TextField label="Value" value={stat.value} onChange={(v) => { const s = [...content.ourWork.achievementStats]; s[i] = { ...stat, value: v }; update('ourWork', { ...content.ourWork, achievementStats: s }); }} />
                      <TextField label="Label" value={stat.label} onChange={(v) => { const s = [...content.ourWork.achievementStats]; s[i] = { ...stat, label: v }; update('ourWork', { ...content.ourWork, achievementStats: s }); }} />
                      <TextField label="Description" value={stat.description} onChange={(v) => { const s = [...content.ourWork.achievementStats]; s[i] = { ...stat, description: v }; update('ourWork', { ...content.ourWork, achievementStats: s }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Stat" onClick={() => update('ourWork', { ...content.ourWork, achievementStats: [...content.ourWork.achievementStats, { icon: 'star', value: '100+', label: 'New Stat', description: 'Description' }] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-4">Projects (Portfolio Gallery & Case Studies)</h3>
              <p className="text-xs text-silver-500">
                All projects added here will automatically appear in both the Portfolio Gallery (top) and the Case Studies section (timeline).
              </p>
              <div className="space-y-4 mt-2">
                {content.ourWork.projects.map((proj, i) => (
                  <ArrayItemCard
                    key={proj.id ?? i}
                    title={`${proj.title || 'Untitled Project'} (${proj.category || 'General'})`}
                    onRemove={() => update('ourWork', { ...content.ourWork, projects: content.ourWork.projects.filter((_, j) => j !== i) })}
                  >
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField
                        label="Project Title"
                        value={proj.title}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = { ...proj, title: v };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <SelectField
                        label="Category"
                        value={proj.category}
                        options={[
                          "Website Development",
                          "Mobile App",
                          "Custom Software",
                          "AI Solutions",
                          "Graphic Design",
                          "SEO & Marketing",
                        ]}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = { ...proj, category: v };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <TextField
                        label="Year"
                        value={proj.year ?? '2024'}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = { ...proj, year: v };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <TextField
                        label="Duration"
                        value={proj.duration}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = { ...proj, duration: v };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <div className="sm:col-span-2">
                        <TextField
                          label="Technologies (comma separated)"
                          value={(proj.technologies ?? []).join(', ')}
                          onChange={(v) => {
                            const p = [...content.ourWork.projects];
                            p[i] = { ...proj, technologies: v.split(',').map((t) => t.trim()).filter(Boolean) };
                            update('ourWork', { ...content.ourWork, projects: p });
                          }}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <ImageUploadField
                          label="Project Cover Image"
                          value={proj.imageUrl}
                          onChange={(v) => {
                            const p = [...content.ourWork.projects];
                            p[i] = { ...proj, imageUrl: v };
                            update('ourWork', { ...content.ourWork, projects: p });
                          }}
                          aspect="video"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <TextField
                          label="Short Description (Thumbnail max 15 words)"
                          value={proj.shortDescription ?? proj.description ?? ''}
                          onChange={(v) => {
                            const p = [...content.ourWork.projects];
                            p[i] = { ...proj, shortDescription: v, description: v };
                            update('ourWork', { ...content.ourWork, projects: p });
                          }}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <TextAreaField
                          label="Detailed Description (Full Case Study)"
                          value={proj.detailedDescription ?? proj.description ?? ''}
                          onChange={(v) => {
                            const p = [...content.ourWork.projects];
                            p[i] = { ...proj, detailedDescription: v };
                            update('ourWork', { ...content.ourWork, projects: p });
                          }}
                          rows={2}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <TextAreaField
                          label="The Challenge"
                          value={proj.challenge ?? ''}
                          onChange={(v) => {
                            const p = [...content.ourWork.projects];
                            p[i] = { ...proj, challenge: v };
                            update('ourWork', { ...content.ourWork, projects: p });
                          }}
                          rows={2}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <TextAreaField
                          label="Our Solution"
                          value={proj.solution ?? ''}
                          onChange={(v) => {
                            const p = [...content.ourWork.projects];
                            p[i] = { ...proj, solution: v };
                            update('ourWork', { ...content.ourWork, projects: p });
                          }}
                          rows={2}
                        />
                      </div>
                      <TextField
                        label="Impact Metric (e.g. 60,000+ / 40%)"
                        value={proj.impact?.metric ?? proj.results ?? ''}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = {
                            ...proj,
                            impact: {
                              metric: v,
                              label: proj.impact?.label ?? 'Key Result',
                              subtext: proj.impact?.subtext ?? '',
                            },
                            results: v,
                          };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <TextField
                        label="Impact Label (e.g. Downloads)"
                        value={proj.impact?.label ?? ''}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = {
                            ...proj,
                            impact: {
                              metric: proj.impact?.metric ?? '100%',
                              label: v,
                              subtext: proj.impact?.subtext ?? '',
                            },
                          };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <TextField
                        label="Impact Subtext (e.g. within 3 months)"
                        value={proj.impact?.subtext ?? ''}
                        onChange={(v) => {
                          const p = [...content.ourWork.projects];
                          p[i] = {
                            ...proj,
                            impact: {
                              metric: proj.impact?.metric ?? '100%',
                              label: proj.impact?.label ?? 'Key Result',
                              subtext: v,
                            },
                          };
                          update('ourWork', { ...content.ourWork, projects: p });
                        }}
                      />
                      <div className="sm:col-span-3 pt-2 border-t border-silver-100">
                        <p className="text-xs font-bold text-silver-700 mb-2">Optional Client Testimonial</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <TextField
                              label="Testimonial Quote"
                              value={proj.testimonial?.quote ?? ''}
                              onChange={(v) => {
                                const p = [...content.ourWork.projects];
                                p[i] = {
                                  ...proj,
                                  testimonial: {
                                    quote: v,
                                    name: proj.testimonial?.name ?? '',
                                    role: proj.testimonial?.role ?? '',
                                  },
                                };
                                update('ourWork', { ...content.ourWork, projects: p });
                              }}
                            />
                          </div>
                          <TextField
                            label="Client Name"
                            value={proj.testimonial?.name ?? ''}
                            onChange={(v) => {
                              const p = [...content.ourWork.projects];
                              p[i] = {
                                ...proj,
                                testimonial: {
                                  quote: proj.testimonial?.quote ?? '',
                                  name: v,
                                  role: proj.testimonial?.role ?? '',
                                },
                              };
                              update('ourWork', { ...content.ourWork, projects: p });
                            }}
                          />
                          <div className="sm:col-span-2">
                            <TextField
                              label="Client Role & Company"
                              value={proj.testimonial?.role ?? ''}
                              onChange={(v) => {
                                const p = [...content.ourWork.projects];
                                p[i] = {
                                  ...proj,
                                  testimonial: {
                                    quote: proj.testimonial?.quote ?? '',
                                    name: proj.testimonial?.name ?? '',
                                    role: v,
                                  },
                                };
                                update('ourWork', { ...content.ourWork, projects: p });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton
                  label="Add New Project"
                  onClick={() => {
                    const newId = `project-${Date.now()}`;
                    update('ourWork', {
                      ...content.ourWork,
                      projects: [
                        ...content.ourWork.projects,
                        {
                          id: newId,
                          title: 'New Project',
                          category: 'Website Development',
                          year: '2024',
                          duration: '3 months',
                          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                          technologies: ['React', 'TailwindCSS'],
                          shortDescription: 'Modern digital solution with high performance and measurable ROI.',
                          detailedDescription: 'Comprehensive end-to-end development of custom solution.',
                          challenge: 'Client needed an innovative approach to solve operational bottlenecks.',
                          solution: 'Engineered scalable system with modern UI and automated workflows.',
                          impact: {
                            metric: '100%',
                            label: 'Success Rate',
                            subtext: 'Delivered on time and within budget',
                          },
                          href: `/our-work#case-study-${newId}`,
                        },
                      ],
                    });
                  }}
                />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* PRICING */}
          <TabsContent value="pricing" className="space-y-6">
            <EditorPanel title="Pricing Page Header & Hero Banner" onSave={() => saveSection('pricingHero')} saving={isSaving}>
              <p className="text-xs text-silver-500 mb-4">
                Edit the header badge, title, subtitle, call button, phone number, and disclaimer on the /pricing page.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Badge"
                  value={content.pricingHero?.badge ?? 'Complete Pricing'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), badge: v })}
                />
                <TextField
                  label="Title"
                  value={content.pricingHero?.title ?? 'Transparent Pricing —'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), title: v })}
                />
                <TextField
                  label="Title Accent"
                  value={content.pricingHero?.titleAccent ?? 'No Hidden Costs.'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), titleAccent: v })}
                />
                <TextField
                  label="Custom Quote CTA Text"
                  value={content.pricingHero?.ctaText ?? 'Get a Custom Quote'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), ctaText: v })}
                />
                <TextField
                  label="Custom Quote CTA Link"
                  value={content.pricingHero?.ctaLink ?? '/#contact'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), ctaLink: v })}
                />
                <TextField
                  label="Phone CTA Text"
                  value={content.pricingHero?.phoneText ?? '+91 85075 07173'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), phoneText: v })}
                />
                <TextField
                  label="Phone CTA Link"
                  value={content.pricingHero?.phoneLink ?? 'tel:+918507507173'}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), phoneLink: v })}
                />
              </div>
              <div className="mt-4 space-y-4">
                <TextAreaField
                  label="Subtitle Description"
                  value={content.pricingHero?.subtitle ?? ''}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), subtitle: v })}
                  rows={2}
                />
                <TextAreaField
                  label="Pricing Disclaimer Note"
                  value={content.pricingHero?.disclaimer ?? ''}
                  onChange={(v) => update('pricingHero', { ...(content.pricingHero ?? {} as any), disclaimer: v })}
                  rows={2}
                />
              </div>
            </EditorPanel>

            <EditorPanel title="Pricing Categories Manager" onSave={() => saveSection('pricingCategories')} saving={isSaving}>
              <p className="text-xs text-silver-500 mb-4">
                Manage pricing categories, sections, tables, rows, and feature lists.
              </p>
              <div className="space-y-6">
                {(content.pricingCategories ?? []).map((cat, catIdx) => (
                  <div key={cat.id || catIdx} className="p-5 rounded-xl border border-silver-300 bg-silver-50 space-y-4">
                    <div className="flex items-center justify-between border-b border-silver-200 pb-3">
                      <h4 className="text-base font-black text-silver-900">{cat.label} Category</h4>
                      <button type="button" onClick={() => {
                        const cats = [...(content.pricingCategories ?? [])];
                        cats.splice(catIdx, 1);
                        update('pricingCategories', cats);
                      }} className="text-sm text-red-600 hover:underline">Remove Category</button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="ID (slug)" value={cat.id} onChange={(v) => { const cats = [...(content.pricingCategories ?? [])]; cats[catIdx] = { ...cat, id: v }; update('pricingCategories', cats); }} />
                      <TextField label="Label" value={cat.label} onChange={(v) => { const cats = [...(content.pricingCategories ?? [])]; cats[catIdx] = { ...cat, label: v }; update('pricingCategories', cats); }} />
                      <TextField label="Icon" value={cat.icon} onChange={(v) => { const cats = [...(content.pricingCategories ?? [])]; cats[catIdx] = { ...cat, icon: v }; update('pricingCategories', cats); }} />
                    </div>

                    <div className="pl-4 border-l-2 border-primary/20 space-y-4">
                      <h5 className="font-bold text-sm text-silver-800">Sections</h5>
                      {cat.sections.map((sec, secIdx) => (
                        <div key={sec.id || secIdx} className="p-4 rounded-lg border border-silver-200 bg-white space-y-3">
                          <div className="flex items-center justify-between">
                            <h6 className="font-bold text-sm">{sec.title}</h6>
                            <button type="button" onClick={() => {
                              const cats = [...(content.pricingCategories ?? [])];
                              const secs = [...cat.sections];
                              secs.splice(secIdx, 1);
                              cats[catIdx] = { ...cat, sections: secs };
                              update('pricingCategories', cats);
                            }} className="text-xs text-red-500 hover:underline">Remove Section</button>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <TextField label="Section ID" value={sec.id} onChange={(v) => { const cats = [...(content.pricingCategories ?? [])]; const secs = [...cat.sections]; secs[secIdx] = { ...sec, id: v }; cats[catIdx] = { ...cat, sections: secs }; update('pricingCategories', cats); }} />
                            <TextField label="Section Title" value={sec.title} onChange={(v) => { const cats = [...(content.pricingCategories ?? [])]; const secs = [...cat.sections]; secs[secIdx] = { ...sec, title: v }; cats[catIdx] = { ...cat, sections: secs }; update('pricingCategories', cats); }} />
                            <div className="sm:col-span-2">
                              <TextAreaField label="Section Subtitle" value={sec.subtitle ?? ''} onChange={(v) => { const cats = [...(content.pricingCategories ?? [])]; const secs = [...cat.sections]; secs[secIdx] = { ...sec, subtitle: v }; cats[catIdx] = { ...cat, sections: secs }; update('pricingCategories', cats); }} rows={2} />
                            </div>
                          </div>

                          {/* Tables */}
                          <div className="pl-4 border-l border-silver-200 space-y-3 mt-3">
                            <h6 className="font-bold text-xs text-silver-700">Tables</h6>
                            {sec.tables.map((table, tbIdx) => (
                              <div key={tbIdx} className="p-3 bg-silver-50 rounded border border-silver-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <TextField label="Table Heading" value={table.heading ?? ''} onChange={(v) => {
                                    const cats = [...(content.pricingCategories ?? [])];
                                    const secs = [...cat.sections];
                                    const tbs = [...sec.tables];
                                    tbs[tbIdx] = { ...table, heading: v };
                                    secs[secIdx] = { ...sec, tables: tbs };
                                    cats[catIdx] = { ...cat, sections: secs };
                                    update('pricingCategories', cats);
                                  }} />
                                  <button type="button" onClick={() => {
                                    const cats = [...(content.pricingCategories ?? [])];
                                    const secs = [...cat.sections];
                                    const tbs = [...sec.tables];
                                    tbs.splice(tbIdx, 1);
                                    secs[secIdx] = { ...sec, tables: tbs };
                                    cats[catIdx] = { ...cat, sections: secs };
                                    update('pricingCategories', cats);
                                  }} className="text-xs text-red-500 hover:underline ml-4">Remove Table</button>
                                </div>
                                <TextField label="Table Note" value={table.note ?? ''} onChange={(v) => {
                                  const cats = [...(content.pricingCategories ?? [])];
                                  const secs = [...cat.sections];
                                  const tbs = [...sec.tables];
                                  tbs[tbIdx] = { ...table, note: v };
                                  secs[secIdx] = { ...sec, tables: tbs };
                                  cats[catIdx] = { ...cat, sections: secs };
                                  update('pricingCategories', cats);
                                }} />

                                {/* Rows */}
                                <div className="space-y-2">
                                  <p className="text-[10px] font-bold uppercase">Rows</p>
                                  {table.rows.map((row, rIdx) => (
                                    <div key={rIdx} className="flex gap-2 items-center">
                                      <div className="flex-1"><TextField label="" value={row.item} placeholder="Item" onChange={(v) => {
                                        const cats = [...(content.pricingCategories ?? [])];
                                        const secs = [...cat.sections];
                                        const tbs = [...sec.tables];
                                        const rows = [...table.rows];
                                        rows[rIdx] = { ...row, item: v };
                                        tbs[tbIdx] = { ...table, rows };
                                        secs[secIdx] = { ...sec, tables: tbs };
                                        cats[catIdx] = { ...cat, sections: secs };
                                        update('pricingCategories', cats);
                                      }} /></div>
                                      <div className="w-32"><TextField label="" value={row.price} placeholder="Price" onChange={(v) => {
                                        const cats = [...(content.pricingCategories ?? [])];
                                        const secs = [...cat.sections];
                                        const tbs = [...sec.tables];
                                        const rows = [...table.rows];
                                        rows[rIdx] = { ...row, price: v };
                                        tbs[tbIdx] = { ...table, rows };
                                        secs[secIdx] = { ...sec, tables: tbs };
                                        cats[catIdx] = { ...cat, sections: secs };
                                        update('pricingCategories', cats);
                                      }} /></div>
                                      <div className="flex-1"><TextField label="" value={row.note ?? ''} placeholder="Note" onChange={(v) => {
                                        const cats = [...(content.pricingCategories ?? [])];
                                        const secs = [...cat.sections];
                                        const tbs = [...sec.tables];
                                        const rows = [...table.rows];
                                        rows[rIdx] = { ...row, note: v };
                                        tbs[tbIdx] = { ...table, rows };
                                        secs[secIdx] = { ...sec, tables: tbs };
                                        cats[catIdx] = { ...cat, sections: secs };
                                        update('pricingCategories', cats);
                                      }} /></div>
                                      <button type="button" onClick={() => {
                                        const cats = [...(content.pricingCategories ?? [])];
                                        const secs = [...cat.sections];
                                        const tbs = [...sec.tables];
                                        const rows = [...table.rows];
                                        rows.splice(rIdx, 1);
                                        tbs[tbIdx] = { ...table, rows };
                                        secs[secIdx] = { ...sec, tables: tbs };
                                        cats[catIdx] = { ...cat, sections: secs };
                                        update('pricingCategories', cats);
                                      }} className="text-red-500 text-xs px-2 py-1">X</button>
                                    </div>
                                  ))}
                                  <button type="button" onClick={() => {
                                    const cats = [...(content.pricingCategories ?? [])];
                                    const secs = [...cat.sections];
                                    const tbs = [...sec.tables];
                                    const rows = [...table.rows, { item: 'New Item', price: '₹0' }];
                                    tbs[tbIdx] = { ...table, rows };
                                    secs[secIdx] = { ...sec, tables: tbs };
                                    cats[catIdx] = { ...cat, sections: secs };
                                    update('pricingCategories', cats);
                                  }} className="text-xs text-primary font-bold">Add Row</button>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const cats = [...(content.pricingCategories ?? [])];
                              const secs = [...cat.sections];
                              const tbs = [...sec.tables, { rows: [] }];
                              secs[secIdx] = { ...sec, tables: tbs };
                              cats[catIdx] = { ...cat, sections: secs };
                              update('pricingCategories', cats);
                            }} className="text-xs text-primary font-bold mt-2">Add Table</button>
                          </div>

                          {/* Lists */}
                          <div className="pl-4 border-l border-silver-200 space-y-3 mt-3">
                            <h6 className="font-bold text-xs text-silver-700">Lists (Features/Notes)</h6>
                            {(sec.lists ?? []).map((list, lIdx) => (
                              <div key={lIdx} className="p-3 bg-silver-50 rounded border border-silver-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <TextField label="List Heading" value={list.heading ?? ''} onChange={(v) => {
                                    const cats = [...(content.pricingCategories ?? [])];
                                    const secs = [...cat.sections];
                                    const lists = [...(sec.lists ?? [])];
                                    lists[lIdx] = { ...list, heading: v };
                                    secs[secIdx] = { ...sec, lists };
                                    cats[catIdx] = { ...cat, sections: secs };
                                    update('pricingCategories', cats);
                                  }} />
                                  <button type="button" onClick={() => {
                                    const cats = [...(content.pricingCategories ?? [])];
                                    const secs = [...cat.sections];
                                    const lists = [...(sec.lists ?? [])];
                                    lists.splice(lIdx, 1);
                                    secs[secIdx] = { ...sec, lists };
                                    cats[catIdx] = { ...cat, sections: secs };
                                    update('pricingCategories', cats);
                                  }} className="text-xs text-red-500 hover:underline ml-4">Remove List</button>
                                </div>

                                <div className="space-y-2">
                                  {list.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex gap-2 items-center">
                                      <div className="flex-1"><TextField label="" value={item} onChange={(v) => {
                                        const cats = [...(content.pricingCategories ?? [])];
                                        const secs = [...cat.sections];
                                        const lists = [...(sec.lists ?? [])];
                                        const items = [...list.items];
                                        items[itemIdx] = v;
                                        lists[lIdx] = { ...list, items };
                                        secs[secIdx] = { ...sec, lists };
                                        cats[catIdx] = { ...cat, sections: secs };
                                        update('pricingCategories', cats);
                                      }} /></div>
                                      <button type="button" onClick={() => {
                                        const cats = [...(content.pricingCategories ?? [])];
                                        const secs = [...cat.sections];
                                        const lists = [...(sec.lists ?? [])];
                                        const items = [...list.items];
                                        items.splice(itemIdx, 1);
                                        lists[lIdx] = { ...list, items };
                                        secs[secIdx] = { ...sec, lists };
                                        cats[catIdx] = { ...cat, sections: secs };
                                        update('pricingCategories', cats);
                                      }} className="text-red-500 text-xs px-2 py-1">X</button>
                                    </div>
                                  ))}
                                  <button type="button" onClick={() => {
                                    const cats = [...(content.pricingCategories ?? [])];
                                    const secs = [...cat.sections];
                                    const lists = [...(sec.lists ?? [])];
                                    const items = [...list.items, 'New Feature'];
                                    lists[lIdx] = { ...list, items };
                                    secs[secIdx] = { ...sec, lists };
                                    cats[catIdx] = { ...cat, sections: secs };
                                    update('pricingCategories', cats);
                                  }} className="text-xs text-primary font-bold">Add Item</button>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const cats = [...(content.pricingCategories ?? [])];
                              const secs = [...cat.sections];
                              const lists = [...(sec.lists ?? []), { items: [] }];
                              secs[secIdx] = { ...sec, lists };
                              cats[catIdx] = { ...cat, sections: secs };
                              update('pricingCategories', cats);
                            }} className="text-xs text-primary font-bold mt-2">Add List</button>
                          </div>

                        </div>
                      ))}
                      <AddButton label="Add Section" onClick={() => {
                        const cats = [...(content.pricingCategories ?? [])];
                        const secs = [...cat.sections, { id: 'new-section', title: 'New Section', tables: [] }];
                        cats[catIdx] = { ...cat, sections: secs };
                        update('pricingCategories', cats);
                      }} />
                    </div>

                  </div>
                ))}
                <AddButton label="Add Pricing Category" onClick={() => {
                  const cats = [...(content.pricingCategories ?? []), { id: 'new-category', label: 'New Category', icon: 'Globe', sections: [] }];
                  update('pricingCategories', cats);
                }} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* CLIENTS */}
          <TabsContent value="ourClients">
            <EditorPanel title="Our Clients" onSave={() => saveSection('ourClients')} saving={isSaving}>
              <SectionHeaderFields header={content.ourClients.header} onChange={(h) => update('ourClients', { ...content.ourClients, header: h })} />
              <h3 className="font-bold text-silver-800 pt-4">Client Logos</h3>
              <div className="space-y-3">
                {content.ourClients.clients.map((client, i) => (
                  <ArrayItemCard key={i} title={client.name} onRemove={() => update('ourClients', { ...content.ourClients, clients: content.ourClients.clients.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Name" value={client.name} onChange={(v) => { const c = [...content.ourClients.clients]; c[i] = { ...client, name: v }; update('ourClients', { ...content.ourClients, clients: c }); }} />
                      <ImageUploadField label="Client Logo" value={client.logo} onChange={(v) => { const c = [...content.ourClients.clients]; c[i] = { ...client, logo: v }; update('ourClients', { ...content.ourClients, clients: c }); }} aspect="auto" />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Client" onClick={() => update('ourClients', { ...content.ourClients, clients: [...content.ourClients.clients, { name: 'New Client', logo: '/logo.png' }] })} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* CONTACT */}
          <TabsContent value="contact">
            <EditorPanel title="Contact Section" onSave={() => saveSection('contact')} saving={isSaving}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Badge" value={content.contact.badge} onChange={(v) => update('contact', { ...content.contact, badge: v })} />
                <TextField label="Title" value={content.contact.title} onChange={(v) => update('contact', { ...content.contact, title: v })} />
                <TextField label="Side Title" value={content.contact.sideTitle} onChange={(v) => update('contact', { ...content.contact, sideTitle: v })} />
                <TextField label="Response Time" value={content.contact.responseTime} onChange={(v) => update('contact', { ...content.contact, responseTime: v })} />
              </div>
              <TextAreaField label="Subtitle" value={content.contact.subtitle} onChange={(v) => update('contact', { ...content.contact, subtitle: v })} />
              <TextAreaField label="Side Description" value={content.contact.sideDescription} onChange={(v) => update('contact', { ...content.contact, sideDescription: v })} />
              <h3 className="font-bold text-silver-800 pt-4">Contact Details</h3>
              <div className="space-y-3">
                {content.contact.details.map((d, i) => (
                  <ArrayItemCard key={i} title={`Contact ${i + 1}`} onRemove={() => update('contact', { ...content.contact, details: content.contact.details.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Icon" value={d.icon} onChange={(v) => { const det = [...content.contact.details]; det[i] = { ...d, icon: v }; update('contact', { ...content.contact, details: det }); }} />
                      <TextField label="Text" value={d.text} onChange={(v) => { const det = [...content.contact.details]; det[i] = { ...d, text: v }; update('contact', { ...content.contact, details: det }); }} />
                      <TextField label="Href" value={d.href} onChange={(v) => { const det = [...content.contact.details]; det[i] = { ...d, href: v }; update('contact', { ...content.contact, details: det }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Contact Detail" onClick={() => update('contact', { ...content.contact, details: [...content.contact.details, { icon: 'mail', text: 'New Contact', href: '#' }] })} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* FOOTER */}
          <TabsContent value="footer">
            <EditorPanel title="Footer" onSave={() => saveSection('footer')} saving={isSaving}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="CTA Title" value={content.footer.ctaTitle} onChange={(v) => update('footer', { ...content.footer, ctaTitle: v })} />
                <TextField label="CTA Button" value={content.footer.ctaButton} onChange={(v) => update('footer', { ...content.footer, ctaButton: v })} />
                <TextField label="Location" value={content.footer.location} onChange={(v) => update('footer', { ...content.footer, location: v })} />
                <TextField label="Copyright Name" value={content.footer.copyright} onChange={(v) => update('footer', { ...content.footer, copyright: v })} />
                <TextField label="Brand Tags (comma sep)" value={content.footer.brandTags.join(', ')} onChange={(v) => update('footer', { ...content.footer, brandTags: v.split(',').map(s => s.trim()).filter(Boolean) })} />
              </div>
              <TextAreaField label="CTA Subtitle" value={content.footer.ctaSubtitle} onChange={(v) => update('footer', { ...content.footer, ctaSubtitle: v })} />
              <TextAreaField label="Brand Description" value={content.footer.brandDescription} onChange={(v) => update('footer', { ...content.footer, brandDescription: v })} />

              <h3 className="font-bold text-silver-800 pt-4">Quick Links</h3>
              <div className="space-y-3">
                {content.footer.quickLinks.map((l, i) => (
                  <ArrayItemCard key={i} title={l.label} onRemove={() => update('footer', { ...content.footer, quickLinks: content.footer.quickLinks.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Label" value={l.label} onChange={(v) => { const links = [...content.footer.quickLinks]; links[i] = { ...l, label: v }; update('footer', { ...content.footer, quickLinks: links }); }} />
                      <TextField label="URL" value={l.href} onChange={(v) => { const links = [...content.footer.quickLinks]; links[i] = { ...l, href: v }; update('footer', { ...content.footer, quickLinks: links }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Quick Link" onClick={() => update('footer', { ...content.footer, quickLinks: [...content.footer.quickLinks, { label: 'New Link', href: '#' }] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-4">Service Links</h3>
              <div className="space-y-3">
                {content.footer.serviceLinks.map((l, i) => (
                  <ArrayItemCard key={i} title={l.label} onRemove={() => update('footer', { ...content.footer, serviceLinks: content.footer.serviceLinks.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Label" value={l.label} onChange={(v) => { const links = [...content.footer.serviceLinks]; links[i] = { ...l, label: v }; update('footer', { ...content.footer, serviceLinks: links }); }} />
                      <TextField label="URL" value={l.href} onChange={(v) => { const links = [...content.footer.serviceLinks]; links[i] = { ...l, href: v }; update('footer', { ...content.footer, serviceLinks: links }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Service Link" onClick={() => update('footer', { ...content.footer, serviceLinks: [...content.footer.serviceLinks, { label: 'New Link', href: '#' }] })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-4">Social Links</h3>
              <div className="space-y-3">
                {content.footer.socialLinks.map((s, i) => (
                  <ArrayItemCard key={i} title={s.label} onRemove={() => update('footer', { ...content.footer, socialLinks: content.footer.socialLinks.filter((_, j) => j !== i) })}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Icon" value={s.icon} onChange={(v) => { const links = [...content.footer.socialLinks]; links[i] = { ...s, icon: v }; update('footer', { ...content.footer, socialLinks: links }); }} />
                      <TextField label="Label" value={s.label} onChange={(v) => { const links = [...content.footer.socialLinks]; links[i] = { ...s, label: v }; update('footer', { ...content.footer, socialLinks: links }); }} />
                      <TextField label="URL" value={s.href} onChange={(v) => { const links = [...content.footer.socialLinks]; links[i] = { ...s, href: v }; update('footer', { ...content.footer, socialLinks: links }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Social Link" onClick={() => update('footer', { ...content.footer, socialLinks: [...content.footer.socialLinks, { icon: 'link', label: 'New Link', href: '#' }] })} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* ABOUT PAGE */}
          <TabsContent value="aboutPage">
            <EditorPanel title="About Us Page" onSave={() => saveSection('aboutPage')} saving={isSaving}>
              <h3 className="font-bold text-silver-800">Hero</h3>
              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                <TextField label="Badge" value={content.aboutPage.hero.badge} onChange={(v) => update('aboutPage', { ...content.aboutPage, hero: { ...content.aboutPage.hero, badge: v } })} />
                <TextField label="Title" value={content.aboutPage.hero.title} onChange={(v) => update('aboutPage', { ...content.aboutPage, hero: { ...content.aboutPage.hero, title: v } })} />
                <TextField label="Title Accent" value={content.aboutPage.hero.titleAccent} onChange={(v) => update('aboutPage', { ...content.aboutPage, hero: { ...content.aboutPage.hero, titleAccent: v } })} />
              <ImageUploadField label="Hero Image" value={content.aboutPage.hero.image} onChange={(v) => update('aboutPage', { ...content.aboutPage, hero: { ...content.aboutPage.hero, image: v } })} />
              </div>
              <TextAreaField label="Description" value={content.aboutPage.hero.description} onChange={(v) => update('aboutPage', { ...content.aboutPage, hero: { ...content.aboutPage.hero, description: v } })} />

              <h3 className="font-bold text-silver-800 pt-6">Who We Are</h3>
              <SectionHeaderFields header={content.aboutPage.whoWeAre.header} onChange={(h) => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, header: h } })} />
              <TextField label="Team Title" value={content.aboutPage.whoWeAre.teamTitle} onChange={(v) => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, teamTitle: v } })} />
              <TextField label="Philosophy" value={content.aboutPage.whoWeAre.philosophy} onChange={(v) => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, philosophy: v } })} />
              
              <h4 className="font-bold text-sm text-silver-700 mt-4">Paragraphs</h4>
              <div className="space-y-2">
                {content.aboutPage.whoWeAre.teamParagraphs.map((p, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1"><TextAreaField label="" value={p} onChange={(v) => {
                      const paras = [...content.aboutPage.whoWeAre.teamParagraphs];
                      paras[i] = v;
                      update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, teamParagraphs: paras } });
                    }} rows={3} /></div>
                    <button type="button" onClick={() => {
                      const paras = [...content.aboutPage.whoWeAre.teamParagraphs];
                      paras.splice(i, 1);
                      update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, teamParagraphs: paras } });
                    }} className="text-red-500 text-xs px-2 py-1">X</button>
                  </div>
                ))}
                <AddButton label="Add Paragraph" onClick={() => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, teamParagraphs: [...content.aboutPage.whoWeAre.teamParagraphs, 'New Paragraph'] } })} />
              </div>

              <h4 className="font-bold text-sm text-silver-700 mt-4">Upskills</h4>
              <div className="space-y-2">
                {content.aboutPage.whoWeAre.upskills.map((u, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="flex-1"><TextField label="" value={u} onChange={(v) => {
                      const upskills = [...content.aboutPage.whoWeAre.upskills];
                      upskills[i] = v;
                      update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, upskills } });
                    }} /></div>
                    <button type="button" onClick={() => {
                      const upskills = [...content.aboutPage.whoWeAre.upskills];
                      upskills.splice(i, 1);
                      update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, upskills } });
                    }} className="text-red-500 text-xs px-2 py-1">X</button>
                  </div>
                ))}
                <AddButton label="Add Upskill" onClick={() => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, upskills: [...content.aboutPage.whoWeAre.upskills, 'New Skill'] } })} />
              </div>

              <h4 className="font-bold text-sm text-silver-700 mt-4">Journey Steps</h4>
              <div className="space-y-3">
                {content.aboutPage.whoWeAre.journey.map((j, i) => (
                  <ArrayItemCard key={i} title={j.title} onRemove={() => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, journey: content.aboutPage.whoWeAre.journey.filter((_, idx) => idx !== i) } })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Icon" value={j.icon} onChange={(v) => { const journey = [...content.aboutPage.whoWeAre.journey]; journey[i] = { ...j, icon: v }; update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, journey } }); }} />
                      <TextField label="Title" value={j.title} onChange={(v) => { const journey = [...content.aboutPage.whoWeAre.journey]; journey[i] = { ...j, title: v }; update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, journey } }); }} />
                      <div className="sm:col-span-2">
                        <TextAreaField label="Description" value={j.description} onChange={(v) => { const journey = [...content.aboutPage.whoWeAre.journey]; journey[i] = { ...j, description: v }; update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, journey } }); }} rows={2} />
                      </div>
                      <CheckboxField label="Active" checked={j.active} onChange={(c) => { const journey = [...content.aboutPage.whoWeAre.journey]; journey[i] = { ...j, active: c }; update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, journey } }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Journey Step" onClick={() => update('aboutPage', { ...content.aboutPage, whoWeAre: { ...content.aboutPage.whoWeAre, journey: [...content.aboutPage.whoWeAre.journey, { icon: 'Star', title: 'New Step', description: '', active: false }] } })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-6">Expertise</h3>
              <SectionHeaderFields header={content.aboutPage.expertise.header} onChange={(h) => update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, header: h } })} />
              <TextField label="Footer Note" value={content.aboutPage.expertise.footerNote} onChange={(v) => update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, footerNote: v } })} />
              <div className="space-y-3 mt-4">
                {content.aboutPage.expertise.items.map((item, i) => (
                  <ArrayItemCard key={i} title={item.title} onRemove={() => update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, items: content.aboutPage.expertise.items.filter((_, idx) => idx !== i) } })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Icon" value={item.icon} onChange={(v) => { const items = [...content.aboutPage.expertise.items]; items[i] = { ...item, icon: v }; update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, items } }); }} />
                      <TextField label="Title" value={item.title} onChange={(v) => { const items = [...content.aboutPage.expertise.items]; items[i] = { ...item, title: v }; update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, items } }); }} />
                      <div className="sm:col-span-2">
                        <TextAreaField label="Description" value={item.description} onChange={(v) => { const items = [...content.aboutPage.expertise.items]; items[i] = { ...item, description: v }; update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, items } }); }} rows={2} />
                      </div>
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Expertise Item" onClick={() => update('aboutPage', { ...content.aboutPage, expertise: { ...content.aboutPage.expertise, items: [...content.aboutPage.expertise.items, { icon: 'Star', title: 'New Expertise', description: '' }] } })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-6">Values</h3>
              <SectionHeaderFields header={content.aboutPage.values.header} onChange={(h) => update('aboutPage', { ...content.aboutPage, values: { ...content.aboutPage.values, header: h } })} />
              <div className="space-y-3 mt-4">
                {content.aboutPage.values.items.map((item, i) => (
                  <ArrayItemCard key={i} title={item.title} onRemove={() => update('aboutPage', { ...content.aboutPage, values: { ...content.aboutPage.values, items: content.aboutPage.values.items.filter((_, idx) => idx !== i) } })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Icon" value={item.icon} onChange={(v) => { const items = [...content.aboutPage.values.items]; items[i] = { ...item, icon: v }; update('aboutPage', { ...content.aboutPage, values: { ...content.aboutPage.values, items } }); }} />
                      <TextField label="Title" value={item.title} onChange={(v) => { const items = [...content.aboutPage.values.items]; items[i] = { ...item, title: v }; update('aboutPage', { ...content.aboutPage, values: { ...content.aboutPage.values, items } }); }} />
                      <div className="sm:col-span-2">
                        <TextAreaField label="Description" value={item.description} onChange={(v) => { const items = [...content.aboutPage.values.items]; items[i] = { ...item, description: v }; update('aboutPage', { ...content.aboutPage, values: { ...content.aboutPage.values, items } }); }} rows={2} />
                      </div>
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Value" onClick={() => update('aboutPage', { ...content.aboutPage, values: { ...content.aboutPage.values, items: [...content.aboutPage.values.items, { icon: 'Star', title: 'New Value', description: '' }] } })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-6">Team Members</h3>
              <div className="space-y-3">
                {content.aboutPage.team.members.map((m, i) => (
                  <ArrayItemCard key={i} title={m.name} onRemove={() => update('aboutPage', { ...content.aboutPage, team: { ...content.aboutPage.team, members: content.aboutPage.team.members.filter((_, j) => j !== i) } })}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField label="Name" value={m.name} onChange={(v) => { const mem = [...content.aboutPage.team.members]; mem[i] = { ...m, name: v }; update('aboutPage', { ...content.aboutPage, team: { ...content.aboutPage.team, members: mem } }); }} />
                      <TextField label="Role" value={m.role} onChange={(v) => { const mem = [...content.aboutPage.team.members]; mem[i] = { ...m, role: v }; update('aboutPage', { ...content.aboutPage, team: { ...content.aboutPage.team, members: mem } }); }} />
                      <ImageUploadField label="Photo" value={m.image} onChange={(v) => { const mem = [...content.aboutPage.team.members]; mem[i] = { ...m, image: v }; update('aboutPage', { ...content.aboutPage, team: { ...content.aboutPage.team, members: mem } }); }} aspect="square" />
                      <TextField label="LinkedIn" value={m.linkedin} onChange={(v) => { const mem = [...content.aboutPage.team.members]; mem[i] = { ...m, linkedin: v }; update('aboutPage', { ...content.aboutPage, team: { ...content.aboutPage.team, members: mem } }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Team Member" onClick={() => update('aboutPage', { ...content.aboutPage, team: { ...content.aboutPage.team, members: [...content.aboutPage.team.members, { name: 'New Member', role: 'Role', image: '/photo.jpg', linkedin: '#' }] } })} />
              </div>

              <h3 className="font-bold text-silver-800 pt-6">Testimonials</h3>
              <div className="space-y-3">
                {content.aboutPage.testimonials.items.map((t, i) => (
                  <ArrayItemCard key={i} title={t.name} onRemove={() => update('aboutPage', { ...content.aboutPage, testimonials: { ...content.aboutPage.testimonials, items: content.aboutPage.testimonials.items.filter((_, j) => j !== i) } })}>
                    <TextAreaField label="Quote" value={t.quote} onChange={(v) => { const items = [...content.aboutPage.testimonials.items]; items[i] = { ...t, quote: v }; update('aboutPage', { ...content.aboutPage, testimonials: { ...content.aboutPage.testimonials, items } }); }} />
                    <div className="grid gap-3 sm:grid-cols-2 mt-3">
                      <TextField label="Name" value={t.name} onChange={(v) => { const items = [...content.aboutPage.testimonials.items]; items[i] = { ...t, name: v }; update('aboutPage', { ...content.aboutPage, testimonials: { ...content.aboutPage.testimonials, items } }); }} />
                      <TextField label="Role" value={t.role} onChange={(v) => { const items = [...content.aboutPage.testimonials.items]; items[i] = { ...t, role: v }; update('aboutPage', { ...content.aboutPage, testimonials: { ...content.aboutPage.testimonials, items } }); }} />
                    </div>
                  </ArrayItemCard>
                ))}
                <AddButton label="Add Testimonial" onClick={() => update('aboutPage', { ...content.aboutPage, testimonials: { ...content.aboutPage.testimonials, items: [...content.aboutPage.testimonials.items, { quote: '', name: '', role: '' }] } })} />
              </div>
            </EditorPanel>
          </TabsContent>

          {/* SITE SETTINGS */}
          <TabsContent value="siteSettings">
            <EditorPanel title="Site Settings" onSave={() => saveSection('siteSettings')} saving={isSaving}>
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageUploadField label="Site Logo" value={content.siteSettings.logo} onChange={(v) => update('siteSettings', { ...content.siteSettings, logo: v })} aspect="auto" />
                <TextField label="Logo Alt" value={content.siteSettings.logoAlt} onChange={(v) => update('siteSettings', { ...content.siteSettings, logoAlt: v })} />
                <TextField label="Company Name" value={content.siteSettings.companyName} onChange={(v) => update('siteSettings', { ...content.siteSettings, companyName: v })} />
                <TextField label="Website" value={content.siteSettings.website} onChange={(v) => update('siteSettings', { ...content.siteSettings, website: v })} />
                <TextField label="Tagline" value={content.siteSettings.tagline} onChange={(v) => update('siteSettings', { ...content.siteSettings, tagline: v })} />
                <TextField label="Contact Email" value={content.siteSettings.contactEmail} onChange={(v) => update('siteSettings', { ...content.siteSettings, contactEmail: v })} />
                <TextField label="Contact Phone" value={content.siteSettings.contactPhone} onChange={(v) => update('siteSettings', { ...content.siteSettings, contactPhone: v })} />
              </div>
            </EditorPanel>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EditorPanel({
  title,
  children,
  onSave,
  saving,
}: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-silver-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-silver-200">
        <h2 className="text-lg font-black text-silver-900">{title}</h2>
        <Button onClick={onSave} disabled={saving} className="bg-primary hover:bg-primary text-white font-bold rounded-xl">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}
