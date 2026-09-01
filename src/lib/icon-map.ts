import {
  Users, Briefcase, Calendar, Smile, Building, TrendingUp, Award,
  Clock, Target, Star, Lightbulb, Heart, Shield, Mail, Phone,
  Smartphone, Globe, Code, Palette, Megaphone, Bot, Sparkles,
  Facebook, Twitter, Linkedin, Instagram, Youtube, Zap, Rocket,
  Building2, Handshake, ShieldCheck, Leaf, MapPin,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  briefcase: Briefcase,
  calendar: Calendar,
  smile: Smile,
  building: Building,
  'trending-up': TrendingUp,
  award: Award,
  clock: Clock,
  target: Target,
  star: Star,
  lightbulb: Lightbulb,
  heart: Heart,
  shield: Shield,
  mail: Mail,
  phone: Phone,
  smartphone: Smartphone,
  globe: Globe,
  code: Code,
  palette: Palette,
  megaphone: Megaphone,
  bot: Bot,
  sparkles: Sparkles,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  zap: Zap,
  rocket: Rocket,
  building2: Building2,
  handshake: Handshake,
  'shield-check': ShieldCheck,
  leaf: Leaf,
  'map-pin': MapPin,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}

export const availableIcons = Object.keys(iconMap);
