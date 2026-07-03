if (data.success) {
    router.push("/admin/proposals");
  } else {
    setError("Invalid credentials");
  }