import React from "react";

interface Skill {
  id: string | number;
  skill_name: string;
}

interface SkillsCategoryCardProps {
  category: string;
  categorySkills: Skill[];
}

const SkillsCategoryCard: React.FC<SkillsCategoryCardProps> = ({ category, categorySkills }) => {
  return (
    <div className="p-6 rounded-lg border border-border bg-card/50">
      <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {categorySkills.map((skill) => (
          <span
            key={skill.id}
            className="px-3 py-1 bg-primary/10 text-secondary-foreground rounded-full text-sm border border-primary/20"
          >
            {skill.skill_name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsCategoryCard;
