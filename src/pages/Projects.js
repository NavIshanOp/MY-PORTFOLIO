import React, { useEffect, useRef, useState, useCallback } from 'react';
import ProjectCard from '../components/ProjectCard';
import styled from 'styled-components';

// Wrapper for the whole projects section.
const ProjectsWrapper = styled.div`
  padding: 3rem 2rem;
  min-height: 80vh;
`;

// A container wrapping both the scroll container and the custom scroll bar.
const ScrollArea = styled.div`
  position: relative;
`;

// Container for the horizontal scrolling of project cards.
const HorizontalScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  align-items: center;
  scroll-behavior: smooth;
  cursor: grab;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// Wrapper for each project card.
const CardWrapper = styled.div`
  display: inline-block;
  margin-right: 2rem;
`;

// Custom ScrollBar track.
const ScrollBar = styled.div`
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-top: 1rem;
  position: relative;
  cursor: pointer;
`;

// Draggable thumb of the scrollbar.
const Thumb = styled.div`
  height: 100%;
  background: red; /* red line for visual indication */
  border-radius: 4px;
  width: ${({ width }) => width}px;
  transform: translateX(${({ left }) => left}px);
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: transform 0.1s ease-out;
`;

const projectsData = [
  {
    title: 'Synex',
    description: 'Ultimate Discord Bot: Moderation, Music, AI, Automation, Fun & More!',
    tags: ['Node.js'],
    demo: 'https://discord.com/oauth2/authorize?client_id=1273604845789515806&permissions=8&integration_type=0&scope=bot',
    image: 'https://i.imgur.com/PzI987D.png',
  },
  {
    title: 'Blogs Website',
    description: 'A personal blog website built with React and Node.js.',
    tags: ['React', 'Node.js'],
    demo: 'https://blogs.ishan.vip',
    image: 'https://i.imgur.com/X5su9PW.png',
  },
  {
    title: 'Aurora AI',
    description: 'An AI-powered platform for personalized learning.',
    tags: ['React', 'Node.js'],
    demo: 'https://aurora.ishan.vip',
    image: 'https://i.imgur.com/I0djILZ.png',
  },
  {
    title: 'NavTantra',
    description: "Sunbeam Lahartara's ATL Club: Innovating minds, creating the future.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://navtantra.ishan.vip',
    image: 'https://i.imgur.com/9PHAF7R.png',
  },
  {
    title: 'Meetify',
    description: "Video calling website with screen share.",
    tags: ['TypeScript', 'CSS', 'HTML'],
    github: 'https://github.com/NavIshanOp/Meetify',
    demo: 'https://meetify.ishan.vip',
    image: 'https://i.imgur.com/c5tTWVM.png',
  },
];

const Projects = ({ projects = projectsData }) => {
  // Duplicate the projects array for a seamless looping effect.
  const duplicatedProjects = [...projects, ...projects];
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  // Auto-scroll control.
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  // State for detecting if mouse is over the entire scroll area.
  const [isHovered, setIsHovered] = useState(false);

  // States for custom scrollbar thumb.
  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

  // Refs to track thumb drag start positions.
  const isThumbDragging = useRef(false);
  const thumbDragStartX = useRef(0);
  const thumbDragStartLeft = useRef(0);

  // Update the custom scroll thumb position and width based on container.
  const updateThumb = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    // Effective scroll width is half because projects are duplicated.
    const effectiveScrollWidth = container.scrollWidth / 2;
    const scrollRange = effectiveScrollWidth - container.clientWidth;
    const ratio = container.scrollLeft / scrollRange || 0;
    const trackWidth = container.clientWidth;
    const calculatedThumbWidth = (container.clientWidth / effectiveScrollWidth) * trackWidth;
    const calculatedThumbLeft = ratio * (trackWidth - calculatedThumbWidth);
    setThumbWidth(calculatedThumbWidth);
    setThumbLeft(calculatedThumbLeft);
  }, []);

  // Auto-scroll using requestAnimationFrame.
  const autoScroll = useCallback(() => {
    const container = scrollRef.current;
    if (container && isAutoScrolling && !isDragging && !isThumbDragging.current) {
      // Use a smaller increment for smoother animation.
      container.scrollLeft += 0.5;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      updateThumb();
      animationRef.current = requestAnimationFrame(autoScroll);
    }
  }, [isAutoScrolling, isDragging, updateThumb]);

  // Start auto-scroll when appropriate.
  useEffect(() => {
    const container = scrollRef.current;
    if (container && container.scrollWidth > container.clientWidth && isAutoScrolling && !isHovered) {
      animationRef.current = requestAnimationFrame(autoScroll);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoScrolling, isHovered, autoScroll]);

  // Update thumb on scroll.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => updateThumb();
    container.addEventListener('scroll', handleScroll);
    updateThumb();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [updateThumb]);

  // Disable auto-scroll when mouse enters the area.
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsAutoScrolling(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  // Resume auto-scroll when mouse leaves after a brief delay.
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
      animationRef.current = requestAnimationFrame(autoScroll);
    }, 500);
  };

  // Mouse event handlers for container dragging.
  const handleMouseDown = () => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isHovered) {
      setIsAutoScrolling(true);
      animationRef.current = requestAnimationFrame(autoScroll);
    }
  };

  // Touch event handlers for mobile.
  const handleTouchStart = () => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!isHovered) {
      setIsAutoScrolling(true);
      animationRef.current = requestAnimationFrame(autoScroll);
    }
  };

  // Mouse events for dragging the custom scroll thumb.
  const handleThumbMouseDown = (e) => {
    e.stopPropagation();
    isThumbDragging.current = true;
    thumbDragStartX.current = e.clientX;
    thumbDragStartLeft.current = thumbLeft;
    setIsAutoScrolling(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isThumbDragging.current) return;
      const container = scrollRef.current;
      const delta = e.clientX - thumbDragStartX.current;
      let newThumbLeft = thumbDragStartLeft.current + delta;
      const trackWidth = container.clientWidth;
      const maxThumbLeft = trackWidth - thumbWidth;
      if (newThumbLeft < 0) newThumbLeft = 0;
      if (newThumbLeft > maxThumbLeft) newThumbLeft = maxThumbLeft;
      setThumbLeft(newThumbLeft);
      const effectiveScrollWidth = container.scrollWidth / 2;
      const scrollRange = effectiveScrollWidth - container.clientWidth;
      container.scrollLeft = (newThumbLeft / maxThumbLeft) * scrollRange;
    };

    const handleMouseUp = () => {
      if (isThumbDragging.current) {
        isThumbDragging.current = false;
        if (!isHovered) {
          setIsAutoScrolling(true);
          animationRef.current = requestAnimationFrame(autoScroll);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [thumbWidth, thumbLeft, isHovered, autoScroll]);

  return (
    <ProjectsWrapper>
      <h2>Projects</h2>
      <ScrollArea onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <HorizontalScrollContainer
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {duplicatedProjects.map((project, index) => (
            <CardWrapper key={`card-${index}`}>
              <ProjectCard {...project} />
            </CardWrapper>
          ))}
        </HorizontalScrollContainer>
        {/* Custom ScrollBar */}
        <ScrollBar>
          <Thumb
            width={thumbWidth}
            left={thumbLeft}
            onMouseDown={handleThumbMouseDown}
          />
        </ScrollBar>
      </ScrollArea>
    </ProjectsWrapper>
  );
};

export default Projects;