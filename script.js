const DEMO_AUTH_ENABLED = true;

function ensureAuth() {
  const body = document.body;
  if (body.dataset.authRequired === "true" && sessionStorage.getItem("hmsAuth") !== "true") {
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

    if (DEMO_AUTH_ENABLED && username && password) {
      sessionStorage.setItem("hmsAuth", "true");
      status.textContent = "";
      window.location.href = "index.html";
      return;
    }

    status.textContent = "Please enter both username and password.";
    status.style.display = "block";
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
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const today = new Date().toISOString().split("T")[0];

  checkInInput.min = today;
  checkOutInput.min = today;

  checkInInput.addEventListener("change", function () {
    checkOutInput.min = checkInInput.value || today;
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const guestName = document.getElementById("guestName").value.trim();
    const roomType = document.getElementById("roomType").value;
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;

    const parseLocalDate = (value) => {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const checkInDate = parseLocalDate(checkIn);
    const checkOutDate = parseLocalDate(checkOut);
    const todayDate = parseLocalDate(today);

    if (checkInDate < todayDate) {
      message.textContent = "Check-in date cannot be in the past.";
      return;
    }

    if (checkOutDate <= checkInDate) {
      message.textContent = "Check-out date must be after check-in date.";
      return;
    }

    message.textContent = `Booking confirmed for ${guestName} (${roomType}) from ${checkIn} to ${checkOut}.`;
    form.reset();
    checkOutInput.min = today;
  });
}

function setupLogout() {
  const logout = document.getElementById("logoutBtn");
  if (!logout) return;
  logout.addEventListener("click", function () {
    sessionStorage.removeItem("hmsAuth");
    window.location.href = "auth.html";
  });
}

ensureAuth();
setupAuthForm();
setupRoomSearch();
setupBookingForm();
setupLogout();
