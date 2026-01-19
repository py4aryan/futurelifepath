import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Sparkles, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skill: {
    title: string;
    description: string;
    type: "main" | "habit" | "challenge";
    duration: string;
    xp: number;
  }) => void;
}

const skillTypes = [
  { id: "main", label: "Main Skill", emoji: "⚡", color: "primary" },
  { id: "habit", label: "Habit", emoji: "🔄", color: "accent" },
  { id: "challenge", label: "Challenge", emoji: "🏆", color: "level" },
] as const;

const durations = ["5 min", "10 min", "15 min", "20 min", "25 min", "30 min"];

const xpOptions = [
  { value: 25, label: "+25 XP" },
  { value: 50, label: "+50 XP" },
  { value: 75, label: "+75 XP" },
  { value: 100, label: "+100 XP" },
];

export function CustomSkillModal({ isOpen, onClose, onAdd }: CustomSkillModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"main" | "habit" | "challenge">("main");
  const [duration, setDuration] = useState("15 min");
  const [xp, setXp] = useState(50);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title, description, type, duration, xp });
    setTitle("");
    setDescription("");
    setType("main");
    setDuration("15 min");
    setXp(50);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl bg-card border-2 shadow-lg p-6 space-y-6 animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">Create Custom Skill</h2>
              <p className="text-sm text-muted-foreground">Add your own skill to today's list</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Skill Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Practice guitar for 15 minutes"
            className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-0 outline-none transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What will you do? Add details to stay focused..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-0 outline-none transition-colors resize-none"
          />
        </div>

        {/* Skill Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Skill Type</label>
          <div className="flex gap-2">
            {skillTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all",
                  type === t.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted hover:border-primary/50"
                )}
              >
                <span className="text-lg mr-1">{t.emoji}</span>
                <span className="text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration & XP */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Clock className="w-4 h-4" /> Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary outline-none"
            >
              {durations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Trophy className="w-4 h-4" /> XP Reward
            </label>
            <select
              value={xp}
              onChange={(e) => setXp(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary outline-none"
            >
              {xpOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="hero" 
            className="flex-1 gap-2" 
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </div>
      </div>
    </div>
  );
}
