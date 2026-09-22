import type { IconType } from "react-icons";
import { Code2 } from "lucide-react";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiPytorch,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiOnnx,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiJsonwebtokens,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRailway,
} from "react-icons/si";
import { DiJava, DiNetbeans } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";

// Every entry here is a real, verified brand icon from react-icons
// (Simple Icons / Devicons / VS Code icon packs) — nothing invented.
// Skills without an official logo (methodologies, protocols, acronyms
// like MVC, JWT concepts, bcrypt, etc.) fall back to a plain code icon
// rather than a guessed or fabricated brand mark.
const iconMap: Record<string, IconType> = {
  Python: SiPython,
  "C++": SiCplusplus,
  Java: DiJava,
  JavaScript: SiJavascript,
  PyTorch: SiPytorch,
  OpenCV: SiOpencv,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  "Scikit-learn": SiScikitlearn,
  "ONNX Runtime": SiOnnx,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  FastAPI: SiFastapi,
  JWT: SiJsonwebtokens,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  HTML: SiHtml5,
  CSS: SiCss,
  "Tailwind CSS": SiTailwindcss,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Vercel: SiVercel,
  Railway: SiRailway,
  "VS Code": VscVscode,
  NetBeans: DiNetbeans,
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon className={className} />;
}
