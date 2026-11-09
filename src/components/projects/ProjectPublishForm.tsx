import { useState, type FormEvent } from 'react';
import { ImagePlus } from 'lucide-react';
import { TextField, TextAreaField } from '@/components/ui/FormFields';
import { Tag } from '@/components/ui/Tag';
import { inputClass, labelClass, primaryButtonClass } from '@/components/ui/styles';
import { useAppData } from '@/context/AppDataContext';
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/types/social';
import { isValidUrl, parseCommaList } from '@/lib/utils';

type ProjectFormField = 'title' | 'description' | 'technologies' | 'projectUrl';
type ProjectFormErrors = Partial<Record<ProjectFormField, string>>;

const MAX_TECHNOLOGIES = 8;

export function ProjectPublishForm({ onPublished }: { onPublished: () => void }) {
  const { addProject } = useAppData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Web');
  const [technologiesText, setTechnologiesText] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [errors, setErrors] = useState<ProjectFormErrors>({});
  const technologies = parseCommaList(technologiesText);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ProjectFormErrors = {};
    if (title.trim().length < 3) nextErrors.title = 'Give your project a name of at least 3 characters.';
    if (description.trim().length < 20) nextErrors.description = 'Describe your project in at least 20 characters.';
    if (technologies.length === 0) {
      nextErrors.technologies = 'Add at least one technology.';
    } else if (technologies.length > MAX_TECHNOLOGIES) {
      nextErrors.technologies = `Use up to ${MAX_TECHNOLOGIES} technologies.`;
    }
    if (!isValidUrl(projectUrl.trim())) nextErrors.projectUrl = 'Enter a full link starting with https://';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    addProject({
      title: title.trim(),
      description: description.trim(),
      category,
      technologies,
      projectUrl: projectUrl.trim(),
    });
    onPublished();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <TextField
        label="Project name"
        placeholder="Pulse Board"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={errors.title}
      />
      <TextAreaField
        label="Description"
        placeholder="What does it do, who is it for, and what did you learn building it?"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        error={errors.description}
        maxLength={400}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="project-category" className={labelClass}>
            Category
          </label>
          <select
            id="project-category"
            value={category}
            onChange={(event) => setCategory(event.target.value as ProjectCategory)}
            className={inputClass}
          >
            {PROJECT_CATEGORIES.map((option) => (
              <option key={option} value={option} className="bg-graphite-900">
                {option}
              </option>
            ))}
          </select>
        </div>
        <TextField
          label="Project URL"
          type="url"
          placeholder="https://your-project.com"
          value={projectUrl}
          onChange={(event) => setProjectUrl(event.target.value)}
          error={errors.projectUrl}
        />
      </div>

      <div>
        <TextField
          label="Technologies used"
          placeholder="React, TypeScript, Tailwind CSS"
          value={technologiesText}
          onChange={(event) => setTechnologiesText(event.target.value)}
          error={errors.technologies}
        />
        {technologies.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <li key={technology}>
                <Tag>{technology}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className={labelClass}>Thumbnail</p>
        <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-graphite-700 bg-graphite-950 text-center">
          <ImagePlus className="h-6 w-6 text-graphite-500" aria-hidden="true" />
          <p className="text-sm text-graphite-400">Thumbnail placeholder</p>
          <p className="text-xs text-graphite-600">Image uploads will be available soon.</p>
        </div>
      </div>

      <div className="flex justify-end border-t border-graphite-800 pt-6">
        <button type="submit" className={`${primaryButtonClass} w-full sm:w-auto`}>
          Publish project
        </button>
      </div>
    </form>
  );
}
