import React from 'react';
import { IoMdAdd, IoMdTrash } from 'react-icons/io';
import { classNameLabel, classNameField } from '@/app/constants';

interface LanguagesProps {
  languages: Array<{
    name: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  }>;
  onChange: (languages: any[]) => void;
}

const LanguagesSection: React.FC<LanguagesProps> = ({ languages, onChange }) => {
  const handleAdd = () => {
    onChange([...languages, { name: '', level: 'BEGINNER' }]);
  };

  const handleRemove = (index: number) => {
    onChange(languages.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onChange(newLanguages);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={classNameLabel}>Languages</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <IoMdAdd className="mr-1" /> Add Language
        </button>
      </div>

      {languages.map((lang, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-4 relative">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <IoMdTrash />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={classNameLabel} htmlFor={`language-${index}`}>
                Language
              </label>
              <input
                id={`language-${index}`}
                value={lang.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className={classNameField}
                required
              />
            </div>

            <div>
              <label className={classNameLabel} htmlFor={`level-${index}`}>
                Proficiency Level
              </label>
              <select
                id={`level-${index}`}
                value={lang.level}
                onChange={(e) => handleChange(index, 'level', e.target.value)}
                className={classNameField}
                required
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
                <option value="NATIVE">Native</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LanguagesSection;