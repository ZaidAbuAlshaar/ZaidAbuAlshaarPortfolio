import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Linkedin, ExternalLink, Github, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/i18n/LanguageContext';
import { siteConfig } from '@/content/site';
import { fadeUp } from '@/lib/animations';
import SEO from '@/components/SEO';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  company: z.string().max(100).optional(),
  projectType: z.string().min(1, 'Select a project type'),
  budget: z.string().optional(),
  preferredContact: z.enum(['whatsapp', 'email']),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const t = {
    en: {
      title: 'Get in Touch',
      subtitle: "Have a project in mind? Let's discuss how I can help bring your vision to life.",
      name: 'Name', email: 'Email', company: 'Company (optional)',
      projectType: 'Project Type', budget: 'Budget (optional)', message: 'Message',
      preferredContact: 'Preferred Contact Method',
      whatsapp: 'WhatsApp',
      emailOption: 'Email',
      send: 'Send Message', sending: 'Sending...',
      types: ['Full-Stack Web App', 'AI Integration', 'UI/UX Design', 'XR/3D Experience', 'Automation', 'Other'],
      budgets: ['< $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'],
      quickContact: 'Quick Contact',
      success: "Message sent! I'll get back to you within 24 hours.",
      pricingNote: 'Pricing is discussed after reviewing the project scope.',
      copyMsg: 'Copy Message',
      msgCopied: 'Message copied!',
    },
    ar: {
      title: 'تواصل معي',
      subtitle: 'لديك مشروع في ذهنك؟ لنناقش كيف يمكنني المساعدة في تحقيق رؤيتك.',
      name: 'الاسم', email: 'البريد الإلكتروني', company: 'الشركة (اختياري)',
      projectType: 'نوع المشروع', budget: 'الميزانية (اختياري)', message: 'الرسالة',
      preferredContact: 'طريقة التواصل المفضلة',
      whatsapp: 'واتساب',
      emailOption: 'بريد إلكتروني',
      send: 'إرسال الرسالة', sending: 'جارٍ الإرسال...',
      types: ['تطبيق ويب متكامل', 'تكامل ذكاء اصطناعي', 'تصميم واجهات', 'تجربة XR/ثلاثية الأبعاد', 'أتمتة', 'أخرى'],
      budgets: ['أقل من ٥٬٠٠٠$', '٥٬٠٠٠ – ١٥٬٠٠٠$', '١٥٬٠٠٠ – ٥٠٬٠٠٠$', 'أكثر من ٥٠٬٠٠٠$', 'غير متأكد بعد'],
      quickContact: 'تواصل سريع',
      success: 'تم إرسال الرسالة! سأرد عليك خلال 24 ساعة.',
      pricingNote: 'يتم مناقشة الأسعار بعد مراجعة نطاق المشروع.',
      copyMsg: 'نسخ الرسالة',
      msgCopied: 'تم نسخ الرسالة!',
    },
  };

  const c = t[lang];

  const { register, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { preferredContact: 'whatsapp' },
  });

  const buildMessage = (data: ContactFormData) => {
    return [
      `*New Project Inquiry*`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : '',
      `Project Type: ${data.projectType}`,
      data.budget ? `Budget: ${data.budget}` : '',
      `Preferred Contact: ${data.preferredContact === 'whatsapp' ? 'WhatsApp' : 'Email'}`,
      `\nMessage:\n${data.message}`,
    ].filter(Boolean).join('\n');
  };

  const onSubmit = async (data: ContactFormData) => {
    const msg = buildMessage(data);

    if (data.preferredContact === 'whatsapp') {
      // Open WhatsApp
      window.open(`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      // Try Formspree if configured, else fall back to mailto
      const formspreeUrl = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      if (formspreeUrl) {
        try {
          await fetch(formspreeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              company: data.company || '',
              projectType: data.projectType,
              budget: data.budget || '',
              preferredContact: data.preferredContact,
              message: data.message,
            }),
          });
        } catch {
          const subject = encodeURIComponent(`Project Inquiry from ${data.name}`);
          const body = encodeURIComponent(msg);
          window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`, '_self');
        }
      } else {
        const subject = encodeURIComponent(`Project Inquiry from ${data.name}`);
        const body = encodeURIComponent(msg);
        window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`, '_self');
      }
    }

    toast({ title: '\u2713', description: c.success });
    reset();
  };

  const handleCopy = () => {
    const data = watch();
    const msg = buildMessage(data as ContactFormData);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    toast({ title: '\u2713', description: c.msgCopied });
    setTimeout(() => setCopied(false), 2000);
  };

  const quickLinks = [
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: `+${siteConfig.phone}`, href: siteConfig.whatsapp },
    { icon: Linkedin, label: 'LinkedIn', href: siteConfig.linkedin },
    { icon: Github, label: 'GitHub', href: siteConfig.github },
  ];

  const preferredContact = watch('preferredContact');

  return (
    <div className="py-20">
      <SEO title={lang === 'en' ? 'Contact' : 'تواصل'} description={lang === 'en' ? 'Get in touch with Zaid Abu Alshaar for your next project.' : 'تواصل مع زيد أبو الشعر لمشروعك القادم.'} path="contact" />
      <div className="container max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-12 space-y-3">
          <h1 className="text-4xl font-bold">{c.title}</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">{c.subtitle}</p>
          <p className="text-xs text-muted-foreground italic">{c.pricingNote}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div {...fadeUp} className="lg:col-span-2">
            <Card className="glass-border">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{c.name}</Label>
                      <Input id="name" {...register('name')} />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{c.email}</Label>
                      <Input id="email" type="email" {...register('email')} />
                      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">{c.company}</Label>
                      <Input id="company" {...register('company')} />
                    </div>
                    <div className="space-y-2">
                      <Label>{c.projectType}</Label>
                      <Select onValueChange={(v) => setValue('projectType', v)}>
                        <SelectTrigger><SelectValue placeholder={c.projectType} /></SelectTrigger>
                        <SelectContent>
                          {c.types.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-xs text-destructive">{errors.projectType.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{c.budget}</Label>
                      <Select onValueChange={(v) => setValue('budget', v)}>
                        <SelectTrigger><SelectValue placeholder={c.budget} /></SelectTrigger>
                        <SelectContent>
                          {c.budgets.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{c.preferredContact}</Label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setValue('preferredContact', 'whatsapp')}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                            preferredContact === 'whatsapp'
                              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                              : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
                          }`}
                        >
                          <Phone className="h-4 w-4" />
                          {c.whatsapp}
                        </button>
                        <button
                          type="button"
                          onClick={() => setValue('preferredContact', 'email')}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                            preferredContact === 'email'
                              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                              : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
                          }`}
                        >
                          <Mail className="h-4 w-4" />
                          {c.emailOption}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{c.message}</Label>
                    <Textarea id="message" rows={5} {...register('message')} />
                    {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> {c.sending}</> : c.send}
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="ms-1 hidden sm:inline">{c.copyMsg}</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-4">
            <h2 className="font-heading text-lg font-semibold">{c.quickContact}</h2>
            {quickLinks.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                <Card className="glass-border hover-lift mb-3">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium flex-1">{label}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
