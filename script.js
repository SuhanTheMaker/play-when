document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Note Card Expansion Logic
    const noteCards = document.querySelectorAll('.note-card');

    noteCards.forEach(card => {
        const btn = card.querySelector('.expand-btn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close other open cards
            noteCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    const otherAudio = otherCard.querySelector('audio');
                    if (otherAudio) otherAudio.pause();
                }
            });

            card.classList.toggle('active');
        });

        // Audio Player Logic
        const audio = card.querySelector('audio');
        const playPauseBtn = card.querySelector('.play-pause-btn');
        const progress = card.querySelector('.progress');
        const progressBar = card.querySelector('.progress-bar');
        const timeDisplay = card.querySelector('.time');

        if (audio && playPauseBtn) {
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (audio.paused) {
                    audio.play();
                    playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                } else {
                    audio.pause();
                    playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                }
            });

            audio.addEventListener('timeupdate', () => {
                const percent = (audio.currentTime / audio.duration) * 100;
                progress.style.width = `${percent}%`;
                
                // Format time
                const mins = Math.floor(audio.currentTime / 60);
                const secs = Math.floor(audio.currentTime % 60);
                timeDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
            });

            // Seek functionality
            progressBar.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = progressBar.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                audio.currentTime = pos * audio.duration;
            });

            // Reset when finished
            audio.addEventListener('ended', () => {
                playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                progress.style.width = '0%';
            });
        }
    });

    // One Last Thing Reveal
    const revealBtn = document.getElementById('one-last-thing');
    const hiddenMsg = document.getElementById('hidden-message');

    if (revealBtn && hiddenMsg) {
        revealBtn.addEventListener('click', () => {
            revealBtn.style.display = 'none';
            hiddenMsg.classList.remove('hidden');
            setTimeout(() => {
                hiddenMsg.classList.add('show');
            }, 10);
        });
    }
});
