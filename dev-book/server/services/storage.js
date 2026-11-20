const { Storage } = require('@google-cloud/storage');

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 2 * 1024 * 1024;

function extensionFor(mime) {
    if (mime === 'image/jpeg') return 'jpg';
    if (mime === 'image/png') return 'png';
    if (mime === 'image/webp') return 'webp';
    return null;
}

function getBucket() {
    const bucketName = process.env.GCS_BUCKET;
    if (!bucketName) {
        throw new Error('GCS_BUCKET is not set');
    }
    return new Storage().bucket(bucketName);
}

async function uploadBookImage(file) {
    if (!file || !ALLOWED_TYPES.has(file.mimetype) || file.size > MAX_BYTES) {
        const error = new Error('Image must be a JPEG, PNG, or WebP under 2 MB');
        error.status = 400;
        throw error;
    }

    const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}.${extensionFor(file.mimetype)}`;
    const bucket = getBucket();

    await bucket.file(filename).save(file.buffer, {
        contentType: file.mimetype,
        resumable: false,
    });

    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}

async function deleteBookImage(imageUrl) {
    const bucketName = process.env.GCS_BUCKET;
    if (!bucketName || typeof imageUrl !== 'string') {
        return;
    }

    const prefix = `https://storage.googleapis.com/${bucketName}/`;
    if (!imageUrl.startsWith(prefix)) {
        return;
    }

    const filename = imageUrl.slice(prefix.length);
    if (!filename || filename.includes('/')) {
        return;
    }

    try {
        await getBucket().file(filename).delete({ ignoreNotFound: true });
    } catch (error) {
        console.error('Failed to delete image from bucket:', error.message);
    }
}

module.exports = {
    uploadBookImage,
    deleteBookImage,
    ALLOWED_TYPES,
    MAX_BYTES,
};
