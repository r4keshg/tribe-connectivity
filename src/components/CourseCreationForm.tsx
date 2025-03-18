
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Video, FileQuestion } from "lucide-react";
import { toast } from 'sonner';

interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  quizQuestions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const CourseCreationForm: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseTags, setCourseTags] = useState('');
  const [modules, setModules] = useState<Module[]>([
    {
      id: `module-${Date.now()}`,
      title: '',
      description: '',
      videoUrl: '',
      quizQuestions: []
    }
  ]);

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: `module-${Date.now()}`,
        title: '',
        description: '',
        videoUrl: '',
        quizQuestions: []
      }
    ]);
  };

  const removeModule = (moduleId: string) => {
    if (modules.length > 1) {
      setModules(modules.filter(m => m.id !== moduleId));
    } else {
      toast.error("You need at least one module in your course.");
    }
  };

  const addQuizQuestion = (moduleId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          quizQuestions: [
            ...module.quizQuestions,
            {
              id: `question-${Date.now()}`,
              question: '',
              options: ['', '', '', ''],
              correctAnswer: 0
            }
          ]
        };
      }
      return module;
    }));
  };

  const removeQuizQuestion = (moduleId: string, questionId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          quizQuestions: module.quizQuestions.filter(q => q.id !== questionId)
        };
      }
      return module;
    }));
  };

  const handleModuleChange = (moduleId: string, field: keyof Module, value: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, [field]: value };
      }
      return module;
    }));
  };

  const handleQuestionChange = (moduleId: string, questionId: string, field: string, value: string | number) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          quizQuestions: module.quizQuestions.map(question => {
            if (question.id === questionId) {
              if (field.startsWith('option-')) {
                const optionIndex = parseInt(field.split('-')[1]);
                const newOptions = [...question.options];
                newOptions[optionIndex] = value as string;
                return { ...question, options: newOptions };
              } else {
                return { ...question, [field]: value };
              }
            }
            return question;
          })
        };
      }
      return module;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!courseTitle.trim()) {
      toast.error("Please enter a course title.");
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log({
      title: courseTitle,
      description: courseDescription,
      tags: courseTags.split(',').map(tag => tag.trim()),
      modules
    });
    
    toast.success("Course created successfully!");
    
    // Reset form
    setCourseTitle('');
    setCourseDescription('');
    setCourseTags('');
    setModules([{
      id: `module-${Date.now()}`,
      title: '',
      description: '',
      videoUrl: '',
      quizQuestions: []
    }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Course Details</h3>
        
        <div>
          <label htmlFor="course-title" className="block text-sm font-medium mb-1">
            Course Title
          </label>
          <Input
            id="course-title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>
        
        <div>
          <label htmlFor="course-description" className="block text-sm font-medium mb-1">
            Course Description
          </label>
          <Textarea
            id="course-description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Describe what students will learn in this course"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="course-tags" className="block text-sm font-medium mb-1">
            Tags (comma separated)
          </label>
          <Input
            id="course-tags"
            value={courseTags}
            onChange={(e) => setCourseTags(e.target.value)}
            placeholder="e.g. JavaScript, Web Development, React"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Modules</h3>
          <Button 
            type="button" 
            onClick={addModule}
            variant="outline"
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Module
          </Button>
        </div>
        
        <div className="space-y-6">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="border rounded-md p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Module {moduleIndex + 1}</h4>
                {modules.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeModule(module.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div>
                <label htmlFor={`module-title-${module.id}`} className="block text-sm font-medium mb-1">
                  Module Title
                </label>
                <Input
                  id={`module-title-${module.id}`}
                  value={module.title}
                  onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                  placeholder="Enter module title"
                />
              </div>
              
              <div>
                <label htmlFor={`module-description-${module.id}`} className="block text-sm font-medium mb-1">
                  Module Description
                </label>
                <Textarea
                  id={`module-description-${module.id}`}
                  value={module.description}
                  onChange={(e) => handleModuleChange(module.id, 'description', e.target.value)}
                  placeholder="Describe this module"
                  rows={2}
                />
              </div>
              
              <div>
                <label htmlFor={`module-video-${module.id}`} className="block text-sm font-medium mb-1">
                  <Video className="h-4 w-4 inline mr-1" />
                  YouTube Video URL
                </label>
                <Input
                  id={`module-video-${module.id}`}
                  value={module.videoUrl}
                  onChange={(e) => handleModuleChange(module.id, 'videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {module.videoUrl && (
                  <div className="mt-2 aspect-video">
                    <div className="border rounded bg-gray-50 h-full flex items-center justify-center">
                      <p className="text-sm text-gray-500">Video preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">
                    <FileQuestion className="h-4 w-4 inline mr-1" />
                    Quiz Questions
                  </label>
                  <Button
                    type="button"
                    onClick={() => addQuizQuestion(module.id)}
                    variant="outline"
                    size="sm"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
                
                {module.quizQuestions.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-md p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium">Question {qIndex + 1}</h5>
                      <Button
                        type="button"
                        onClick={() => removeQuizQuestion(module.id, question.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div>
                      <Input
                        value={question.question}
                        onChange={(e) => handleQuestionChange(module.id, question.id, 'question', e.target.value)}
                        placeholder="Enter question"
                        className="mb-2"
                      />
                      
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <div className="w-6 text-center mr-2">{String.fromCharCode(65 + oIndex)}.</div>
                          <Input
                            value={option}
                            onChange={(e) => handleQuestionChange(module.id, question.id, `option-${oIndex}`, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            className="flex-1"
                          />
                        </div>
                      ))}
                      
                      <div className="flex items-center">
                        <label className="mr-2 text-sm">Correct answer:</label>
                        <Select
                          value={question.correctAnswer.toString()}
                          onValueChange={(value) => handleQuestionChange(module.id, question.id, 'correctAnswer', parseInt(value))}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {question.options.map((_, oIndex) => (
                              <SelectItem key={oIndex} value={oIndex.toString()}>
                                Option {String.fromCharCode(65 + oIndex)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                
                {module.quizQuestions.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No quiz questions added yet.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Create Course</Button>
      </div>
    </form>
  );
};

export default CourseCreationForm;
