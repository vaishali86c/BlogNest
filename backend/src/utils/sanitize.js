import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize EditorJS block data to prevent stored XSS.
 * Allows safe formatting tags but strips scripts, event handlers,
 * and dangerous URL schemes.
 */
const sanitizeOptions = {
    allowedTags: [
        'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
        'img', 'mark', 'del', 'ins', 'sub', 'sup', 'span',
    ],
    allowedAttributes: {
        a: ['href', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        span: ['class'],
        code: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    // Strip all event handler attributes (onclick, onerror, etc.)
    disallowedTagsMode: 'discard',
};

/**
 * Recursively sanitise all string values inside an EditorJS block's `data` object.
 */
const sanitizeBlockData = (data) => {
    if (data === null || data === undefined) return data;

    if (typeof data === 'string') {
        return sanitizeHtml(data, sanitizeOptions);
    }

    if (Array.isArray(data)) {
        return data.map(sanitizeBlockData);
    }

    if (typeof data === 'object') {
        const sanitized = {};
        for (const [key, value] of Object.entries(data)) {
            sanitized[key] = sanitizeBlockData(value);
        }
        return sanitized;
    }

    // numbers, booleans, etc. — pass through
    return data;
};

/**
 * Sanitize the full EditorJS content payload (the `blocks` array).
 */
export const sanitizeContent = (content) => {
    if (!content?.blocks || !Array.isArray(content.blocks)) {
        return { blocks: [] };
    }

    return {
        blocks: content.blocks.map((block) => ({
            ...block,
            data: sanitizeBlockData(block.data),
        })),
    };
};
