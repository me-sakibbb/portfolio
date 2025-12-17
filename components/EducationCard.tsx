import { formatDate } from "@/lib/utils"
import React from "react"

export function EducationCard({ edu }: { edu: any }) {
   return (
      <div className="p-6 rounded-lg border border-border bg-card/50">
         <div className="flex justify-between items-start">
            <div>
               <h3 className="text-xl font-semibold">{edu.degree}</h3>
               <p className="text-muted-foreground">{edu.institution}</p>
            </div>
            {edu.is_current ? (
               <span className="bg-green-500/20 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                  Current
               </span>
            ) : (
               <span className="bg-gray-500/20 text-gray-700 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                  {edu.year}
               </span>
            )}
         </div>
         {edu.gpa && <p className="text-sm text-muted-foreground mt-2">GPA: {edu.gpa}</p>}
         {edu.description && <p className="text-muted-foreground mt-2">{edu.description}</p>}
      </div>
   )
}


