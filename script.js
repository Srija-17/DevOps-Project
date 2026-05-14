function ensureAuth() {
  const body = document.body;
  if (body.dataset.authRequired === "true" && localStorage.getItem("hmsAuth") !== "true") {
    window.location.href = "auth.html";
  }
}

function setupAuthForm() {
  const form = document.getElementById("authForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const status = document.getElementById("authStatus");

    if (username === "admin" && password === "hotel123") {
      localStorage.setItem("hmsAuth", "true");
      window.location.href = "index.html";
      return;
    }

    status.textContent = "Invalid credentials. Use admin / hotel123";
  });
}

function setupRoomSearch() {
  const search = document.getElementById("roomSearch");
  if (!search) return;

  const cards = Array.from(document.querySelectorAll(".room-card"));
  const empty = document.getElementById("emptyResults");

  search.addEventListener("input", function () {
    const query = search.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const content = card.textContent.toLowerCase();
      const visible = content.includes(query);
      card.style.display = visible ? "block" : "none";
      if (visible) visibleCount += 1;
    });

    if (empty) {
      empty.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
}

function setupBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  const message = document.getElementById("bookingMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const guestName = document.getElementById("guestName").value.trim();
    const roomType = document.getElementById("roomType").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    message.textContent = `Booking confirmed for ${guestName} (${roomType}) from ${checkIn} to ${checkOut}.`;
    form.reset();
  });
}

function setupLogout() {
  const logout = document.getElementById("logoutBtn");
  if (!logout) return;
  logout.addEventListener("click", function () {
    localStorage.removeItem("hmsAuth");
    window.location.href = "auth.html";
  });
}

ensureAuth();
setupAuthForm();
setupRoomSearch();
setupBookingForm();
setupLogout();
