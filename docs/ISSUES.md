# Issue Tracker

Use this document to track known bugs, feature requests, and planned improvements for the Kneel PWA.

## 🐛 Known Bugs

### Content & Rendering (Malayalam)
- [x] **Headings Not Highlighted:** Headings for "Prayer Before Confession" and "Act of Contrition" are not highlighted/styled correctly in Malayalam.
- [x] **Text Overflow (Prayers):** Text is cut off in "Prayer Before Confession" and "Act of Contrition". Content needs to be paginated to carry over to a new page instead of clipping.
- [x] **Text Overflow (Guide):** Guide content is overflowing the viewport; needs to be carried forward to the next page.
- [x] **Commandments Ordering:** In the explanation of Ten Commandments, the commandments are ordered/grouped incorrectly (Example: user reported 6 & 10 are together).

### UI & Layout
- [x] **"Make an Entry" Button:** The button is identifying as not visible on several pages.
- [x] **PDF Link Visibility:** The "Full view PDF" link is not visible and requires scrolling to see (should be in viewport).
- [x] **Duplicate Headings:** The big heading is repeated on both pages for prayers (e.g., Prayer Before Confession).
- [x] **Back Button Position:** Back button is not positioned correctly in the footer.
- [x] **Guide Layout:** "Make an Entry" button hidden due to clipping/footer overlap. Guide content clipping issues.
- [x] **Content Clipping:** Prayer Before Confession (Malayalam) content is clipped and not flowing to next page.

### Logic
### Logic
- [x] **PDF Link Incorrect:** The PDF link points to the Malayalam PDF even when the language is set to English.
- [ ] **Verify Malayalam Text Rendering:** Check for any remaining ligature issues or clipping on actual mobile devices.
- [ ] **Safe Area Insets:** Ensure all screens respect safe area insets on iPhone.
- [x] **PWA Install:** Fixed manifest generation by downgrading Vite to v7.
- [x] **Layout Glitches:** Fixed footer bouncing and Prepare button visibility by enforcing `h-[100dvh]` and `shrink-0`.
- [x] **Scroll Retention:** Preparation Guide now remembers scroll position when navigating to Add Sin screen.

## 🛠 Improvements

### Settings UI
- [ ] **Rename Label:** Change "Language" setting label to **"Set Prayer Language"**.
- [ ] **Add Description:** Add a description text: *"The user can prefer to use confession guide in the following languages."*

### Future Features
- [ ] **Biometric Auth:** Implement WebAuthn for FaceID/TouchID support (Planned).
- [ ] **Accessibility Audit:** Run full accessibility check.
- [ ] **Performance:** Audit bundle size and load times.
