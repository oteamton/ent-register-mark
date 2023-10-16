import React, { useState, useRef, useEffect } from 'react';

const AutoExpandTextarea: React.FC = () => {
    const [text, setText] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, [text]); // Recalculate the height every time `text` changes

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
                lineHeight: '1.2em',
                minHeight: '3.6em',
                overflowY: 'hidden',
                resize: 'none'
            }}
        />
    );
}

export default AutoExpandTextarea;
