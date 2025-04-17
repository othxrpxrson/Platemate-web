
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Edit, X, CheckCircle, Upload, Video, Camera, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface VideoPresentationProps {
  videoUrl: string;
  description: string;
  isEditable?: boolean;
  onVideoChange?: (url: string) => void;
  onDescriptionChange?: (description: string) => void;
}

const VideoPresentation: React.FC<VideoPresentationProps> = ({
  videoUrl,
  description,
  isEditable = false,
  onVideoChange,
  onDescriptionChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [tempVideoUrl, setTempVideoUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    setEditedDescription(description);
  }, [description]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDescriptionEdit = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionSave = () => {
    setIsEditingDescription(false);
    if (onDescriptionChange) {
      onDescriptionChange(editedDescription);
    }
    toast({
      title: t('descriptionUpdated'),
      description: t('profileDescriptionUpdated'),
    });
  };

  const handleDescriptionCancel = () => {
    setIsEditingDescription(false);
    setEditedDescription(description);
  };

  const handleVideoEdit = () => {
    setIsEditingVideo(true);
    setTempVideoUrl('');
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempVideoUrl(e.target.value);
  };

  const handleVideoSave = () => {
    if (tempVideoUrl && onVideoChange) {
      onVideoChange(tempVideoUrl);
      toast({
        title: t('videoUpdated'),
        description: t('profileVideoUpdated'),
      });
    }
    setIsEditingVideo(false);
  };

  const handleVideoCancel = () => {
    setIsEditingVideo(false);
    setTempVideoUrl('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5, 
        duration: 0.3 
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const editButtonVariants = {
    initial: { opacity: 0.8, scale: 1 },
    hover: { 
      opacity: 1, 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-md bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="relative aspect-video bg-gray-900 rounded-tl-xl rounded-bl-xl overflow-hidden"
          variants={itemVariants}
        >
          {isEditingVideo ? (
            <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center p-6">
              <Video size={36} className="text-platemate-orange mb-4" />
              <h3 className="text-white font-medium mb-4">{t('updateVideo')}</h3>
              <input
                type="text"
                placeholder={t('enterVideoURL')}
                value={tempVideoUrl}
                onChange={handleVideoUrlChange}
                className="w-full p-2 rounded mb-4 text-black"
              />
              <div className="flex space-x-2">
                <motion.button 
                  className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={handleVideoSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle size={18} className="mr-2" />
                  {t('save')}
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={handleVideoCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} className="mr-2" />
                  {t('cancel')}
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                onClick={togglePlay}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <motion.button
                  className="w-10 h-10 rounded-full bg-platemate-orange/80 hover:bg-platemate-orange flex items-center justify-center text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  variants={controlsVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>
                
                <motion.button
                  className="w-10 h-10 rounded-full bg-platemate-orange/80 hover:bg-platemate-orange flex items-center justify-center text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  variants={controlsVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </motion.button>
              </div>
              
              {isEditable && (
                <motion.button 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-platemate-orange shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoEdit();
                  }}
                  variants={editButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Edit size={16} />
                </motion.button>
              )}
            </>
          )}
        </motion.div>
        
        <motion.div 
          className="p-6 relative"
          variants={itemVariants}
        >
          {isEditingDescription ? (
            <div className="h-full">
              <h3 className="text-lg font-semibold text-platemate-brown mb-3">
                {t('editDescription')}
              </h3>
              <Textarea 
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder={t('descriptionPlaceholder')}
                className="w-full h-32 mb-4"
              />
              <div className="flex space-x-2">
                <motion.button 
                  className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={handleDescriptionSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle size={18} className="mr-2" />
                  {t('save')}
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={handleDescriptionCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} className="mr-2" />
                  {t('cancel')}
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-platemate-brown mb-3">
                {t('aboutMe')}
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {description}
              </p>
              
              {isEditable && (
                <motion.button 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-platemate-orange"
                  onClick={handleDescriptionEdit}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} />
                </motion.button>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoPresentation;
