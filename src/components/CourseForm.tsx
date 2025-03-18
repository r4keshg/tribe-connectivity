
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, Youtube, FileText, Check } from 'lucide-react';

const CourseForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [modules, setModules] = useState([{ 
    title: '', 
    content: '',
    youtubeUrl: '',
    quizQuestions: [] as {question: string, options: string[], correctAnswer: number}[]
  }]);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddModule = () => {
    setModules([...modules, { 
      title: '', 
      content: '',
      youtubeUrl: '',
      quizQuestions: []
    }]);
  };

  const handleRemoveModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setModules(updatedModules);
  };

  const handleAddQuestion = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].quizQuestions.push({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setModules(updatedModules);
  };

  const handleQuestionChange = (
    moduleIndex: number, 
    questionIndex: number, 
    field: string, 
    value: string | number,
    optionIndex?: number
  ) => {
    const updatedModules = [...modules];
    if (field === 'option' && typeof optionIndex === 'number') {
      updatedModules[moduleIndex].quizQuestions[questionIndex].options[optionIndex] = value as string;
    } else if (field === 'correctAnswer') {
      updatedModules[moduleIndex].quizQuestions[questionIndex].correctAnswer = value as number;
    } else {
      updatedModules[moduleIndex].quizQuestions[questionIndex][field as 'question'] = value as string;
    }
    setModules(updatedModules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this to your API
    const courseData = {
      title,
      description,
      tags,
      modules
    };
    
    console.log('Course created:', courseData);
    // You would typically reset the form here or redirect
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="course-title">Course Title</Label>
            <Input 
              id="course-title" 
              placeholder="Enter course title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-description">Course Description</Label>
            <Textarea 
              id="course-description" 
              placeholder="Describe what students will learn" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-tags">Tags</Label>
            <div className="flex">
              <Input 
                id="course-tags" 
                placeholder="Add tags (e.g., 'javascript', 'web development')" 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Course Modules</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add modules to structure your course content
        </p>
      </div>
      
      {modules.map((module, moduleIndex) => (
        <Card key={moduleIndex} className="mb-8 border-brand-100">
          <CardHeader className="bg-brand-50 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Module {moduleIndex + 1}</CardTitle>
              {modules.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleRemoveModule(moduleIndex)}
                  className="h-8 text-red-500"
                >
                  <Trash className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor={`module-title-${moduleIndex}`}>Module Title</Label>
              <Input 
                id={`module-title-${moduleIndex}`} 
                placeholder="Module title" 
                value={module.title}
                onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`module-content-${moduleIndex}`}>Content</Label>
              <Textarea 
                id={`module-content-${moduleIndex}`} 
                placeholder="Module content and description" 
                rows={4}
                value={module.content}
                onChange={(e) => handleModuleChange(moduleIndex, 'content', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`module-youtube-${moduleIndex}`} className="flex items-center">
                <Youtube className="h-4 w-4 mr-1" /> YouTube Video URL
              </Label>
              <Input 
                id={`module-youtube-${moduleIndex}`} 
                placeholder="https://youtube.com/watch?v=..." 
                value={module.youtubeUrl}
                onChange={(e) => handleModuleChange(moduleIndex, 'youtubeUrl', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Add a YouTube video to complement your module content
              </p>
            </div>
            
            {/* Quiz Section */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Module Quiz Questions</h4>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddQuestion(moduleIndex)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Question
                </Button>
              </div>
              
              {module.quizQuestions.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No quiz questions yet.</p>
                  <p className="text-sm text-gray-400">Add questions to test knowledge at the end of this module.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {module.quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Question {qIndex + 1}</h5>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            const updatedModules = [...modules];
                            updatedModules[moduleIndex].quizQuestions.splice(qIndex, 1);
                            setModules(updatedModules);
                          }}
                          className="h-8 text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`question-${moduleIndex}-${qIndex}`}>
                            Question
                          </Label>
                          <Input 
                            id={`question-${moduleIndex}-${qIndex}`} 
                            placeholder="Enter question" 
                            value={question.question}
                            onChange={(e) => handleQuestionChange(
                              moduleIndex, qIndex, 'question', e.target.value
                            )}
                            required
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Answer Options</Label>
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center">
                              <div 
                                className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center
                                  ${question.correctAnswer === oIndex ? 
                                    'bg-green-100 text-green-600 border border-green-200' : 
                                    'bg-gray-100 text-gray-400 border border-gray-200'}`}
                                onClick={() => handleQuestionChange(
                                  moduleIndex, qIndex, 'correctAnswer', oIndex
                                )}
                                role="button"
                                tabIndex={0}
                              >
                                {question.correctAnswer === oIndex && <Check className="h-3 w-3" />}
                              </div>
                              <Input 
                                placeholder={`Option ${oIndex + 1}`} 
                                value={option}
                                onChange={(e) => handleQuestionChange(
                                  moduleIndex, qIndex, 'option', e.target.value, oIndex
                                )}
                                className="flex-1"
                                required
                              />
                            </div>
                          ))}
                          <p className="text-xs text-gray-500">
                            Click the circle to mark the correct answer
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex gap-4 mb-8">
        <Button type="button" variant="outline" onClick={handleAddModule} className="flex-1">
          <Plus className="h-4 w-4 mr-2" /> Add Another Module
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-8">
        <h3 className="font-medium mb-2">Ready to publish?</h3>
        <p className="text-sm text-gray-500 mb-4">
          Once published, your course will be available for students to enroll.
        </p>
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">Publish Course</Button>
          <Button type="button" variant="outline">Save as Draft</Button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
