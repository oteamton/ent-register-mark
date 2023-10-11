import React, { useEffect, useRef } from 'react';
import '../styles/dotCircle.css';

interface DotCircleProps {
    radius: number;
    numberOfDots: number;
}

const DotCircle: React.FC<DotCircleProps> = ({ radius, numberOfDots }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        let animationFrameId: number;

        // Initialize dots with random positions, velocities, and depth
        const dots = Array.from({ length: numberOfDots }).map(() => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * radius;
            const z = Math.random() * radius; // Simulate depth
            const velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            };
            return {
                x: centerX + distance * Math.cos(angle),
                y: centerY + distance * Math.sin(angle),
                z,
                velocity,
            };
        });

        const render = () => {
            // Clear the container and canvas
            while (container.firstChild) {
                container.firstChild.remove();
            }
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Draw lines between each dot
            dots.forEach((dotA, idx) => {
                dots.slice(idx + 1).forEach(dotB => {
                    ctx.beginPath();
                    ctx.moveTo(dotA.x, dotA.y);
                    ctx.lineTo(dotB.x, dotB.y);
                    ctx.strokeStyle = 'rgba(255, 0, 0, 1)'; // Adjust as needed
                    ctx.stroke();
                });
            });

            // Move and render each dot
            dots.forEach(dot => {
                dot.x += dot.velocity.x;
                dot.y += dot.velocity.y;
                dot.z += dot.velocity.z;

                // Bounce the dot off the "boundary" of the circle and depth limits
                if (Math.sqrt((dot.x - centerX) ** 2 + (dot.y - centerY) ** 2) > radius || dot.z < 0 || dot.z > radius) {
                    dot.velocity.x = -dot.velocity.x;
                    dot.velocity.y = -dot.velocity.y;
                    dot.velocity.z = -dot.velocity.z;
                }

                const scale = 0.5 + 0.5 * (dot.z / radius); // Near dots are larger
                const opacity = 0.5 + 0.5 * (dot.z / radius); // Near dots are more opaque

                const div = document.createElement('div');
                div.className = 'dot';
                div.style.left = `${dot.x}px`;
                div.style.top = `${dot.y}px`;
                div.style.transform = `translate(-50%, -50%) scale(${scale})`;
                div.style.opacity = `${opacity}`;
                container.appendChild(div);
            });

            // Request the next animation frame
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            // Clean up animation on component unmount
            cancelAnimationFrame(animationFrameId);
        };
    }, [radius, numberOfDots]);

    return (
        <div ref={containerRef} id="dotContainer">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}>
            </canvas>
        </div>);
};

export default DotCircle;
