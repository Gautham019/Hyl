import { useEffect, useState, type FormEvent } from 'react';
import { Avatar } from '@/components/people/Avatar';
import { TextAreaField, TextField } from '@/components/ui/FormFields';
import { primaryButtonClass } from '@/components/ui/styles';
import { useAppData } from '@/context/AppDataContext';
import { isValidUsername, parseCommaList, toUsername } from '@/lib/utils';

const MAX_BIO_LENGTH = 160;

type ProfileErrors = { name?: string; username?: string };

export function EditProfileForm() {
  const { currentUser, updateProfile } = useAppData();
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);
  const [skillsText, setSkillsText] = useState(currentUser.skills.join(', '));
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(false);
  }, [name, username, location, bio, skillsText]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ProfileErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Enter your name.';
    if (!isValidUsername(username)) nextErrors.username = 'Use 3 to 20 letters, numbers or underscores.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    updateProfile({
      name: name.trim(),
      username,
      location: location.trim(),
      bio: bio.trim(),
      skills: parseCommaList(skillsText),
    });
    setIsSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar name={name.trim() || currentUser.name} src={currentUser.avatarUrl} size="lg" className="h-20 w-20" />
        <p className="text-sm text-graphite-400">Profile photos are taken from your initials for now.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Display name" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(toUsername(event.target.value))}
          error={errors.username}
        />
      </div>
      <TextField label="Location" placeholder="Lisbon, Portugal" value={location} onChange={(event) => setLocation(event.target.value)} />
      <TextAreaField
        label="Bio"
        value={bio}
        maxLength={MAX_BIO_LENGTH}
        onChange={(event) => setBio(event.target.value)}
        hint={`${bio.length}/${MAX_BIO_LENGTH} characters`}
        placeholder="What do you build, and what are you learning next?"
        className="min-h-[96px]"
      />
      <TextField
        label="Skills and technologies"
        placeholder="React, TypeScript, Figma"
        value={skillsText}
        onChange={(event) => setSkillsText(event.target.value)}
      />

      <div className="flex items-center justify-end gap-4 border-t border-graphite-800 pt-6">
        {isSaved && <p role="status" className="text-sm text-success-400">Profile saved.</p>}
        <button type="submit" className={`${primaryButtonClass} w-full sm:w-auto`}>
          Save changes
        </button>
      </div>
    </form>
  );
}
