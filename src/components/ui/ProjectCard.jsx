import { Github, Globe, Play } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import React, { useState } from "react";

const ProjectCard = ({ project }) => {
  const { video, image, title, date, description, badges, liveUrl, githubUrl } = project || {};
  
  return (
    <div className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg w-full h-full flex flex-col">
      
      <VideoWithPlaceholder video={video} title={title} />
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors duration-200">
            {title || "Project Title"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {date}
          </p>
        </div>

        {/* Description (limited to 2 lines) */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-4 line-clamp-2">
          {description || "Project description goes here..."}
        </p>

        {/* Technologies */}
        {badges?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {liveUrl && (
            <Button 
              asChild 
              size="sm"
              className="text-xs px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-all duration-200 hover:scale-105 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="gap-2 flex items-center">
                <Globe className="w-3.5 h-3.5" />
                Live Demo
              </a>
            </Button>
          )}
          
          {githubUrl && (
            <Button 
              variant="outline" 
              asChild 
              size="sm"
              className="text-xs px-4 py-2 transition-all duration-200 hover:scale-105 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="gap-1 flex items-center">
                <Github className="h-3.5 w-3.5" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const VideoWithPlaceholder = ({ video }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  if (hasError || !video) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center relative overflow-hidden rounded-t-2xl">
        <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mb-3 border border-gray-200 dark:border-gray-700">
          <Play className="w-7 h-7 text-gray-400 dark:text-gray-500 ml-0.5" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Video Preview Unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-t-2xl">
      <video 
        src={video}  
        autoPlay
        muted 
        loop 
        playsInline
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setHasError(true)}
        onLoadedData={() => setIsLoading(false)}
        ref={(vid) => {
          if (vid) vid.playbackRate = 1.2;
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mb-3 border border-gray-200 dark:border-gray-700 animate-pulse">
            <Play className="w-6 h-6 text-gray-400 dark:text-gray-500 ml-0.5" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">
            Loading Preview...
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
