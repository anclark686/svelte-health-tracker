<script>
  export let errorMap;

  const SEXES = ["Male", "Female"];
  const GENDERS = ["Male", "Female", "Non-binary", "Agender", "Other"];
  const HEIGHTS = [
    "4'0\"",
    "4'1\"",
    "4'2\"",
    "4'3\"",
    "4'4\"",
    "4'5\"",
    "4'6\"",
    "4'7\"",
    "4'8\"",
    "4'9\"",
    "4'10\"",
    "4'11\"",
    "5'0\"",
    "5'1\"",
    "5'2\"",
    "5'3\"",
    "5'4\"",
    "5'5\"",
    "5'6\"",
    "5'7\"",
    "5'8\"",
    "5'9\"",
    "5'10\"",
    "5'11\"",
    "6'0\"",
    "6'1\"",
    "6'2\"",
    "6'3\"",
    "6'4\"",
    "6'5\"",
    "6'6\"",
    "6'7\"",
    "6'8\"",
    "6'9\"",
    "6'10\"",
    "6'11\"",
    "7'0\"",
  ];
</script>

<div class="basic-info content-box">
  <h2 class="content-header">Basic Info</h2>
  <div class="form-content">
    <label for="firstName" class="form-label">First Name</label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      class={`form-input ${errorMap.firstName ? "input-error" : ""}`}
    />
    {#if errorMap.firstName}
      <p class="error-message">Please enter your first name</p>
    {/if}
    <label for="lastName" class="form-label">Last Name</label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      class={`form-input ${errorMap.lastName ? "input-error" : ""}`}
    />
    {#if errorMap.lastName}
      <p class="error-message">Please enter your last name</p>
    {/if}
    <label for="phoneNum" class="form-label">Phone Number</label>
    <input
      type="text"
      id="phoneNum"
      name="phoneNum"
      class={`form-input ${errorMap.phoneNum ? "input-error" : ""}`}
    />
    {#if errorMap.phoneNum}
      <p class="error-message">Please enter your phone number</p>
    {/if}
    <label for="birthday" class="form-label">Birthday</label>
    <input
      type="date"
      id="birthday"
      name="birthday"
      class={`form-input ${errorMap.birthday ? "input-error" : ""}`}
    />
    {#if errorMap.birthday}
      <p class="error-message">Please enter your birthday</p>
    {/if}
    <label for="height" class="form-label">Height</label>
    <select
      name="height"
      id="height"
      class={`form-input ${errorMap.height ? "input-error" : ""}`}
    >
      <option value="">Select One</option>
      {#each HEIGHTS as height}
        <option value={height}>{height}</option>
      {/each}
    </select>
    {#if errorMap.height}
      <p class="error-message">Please select an option</p>
    {/if}
    <label for="sex" class="form-label">Sex</label>
    <select
      name="sex"
      id="sex"
      class={`form-input ${errorMap.sex ? "input-error" : ""}`}
    >
      <option value="">Select One</option>
      {#each SEXES as sex}
        <option value={sex}>{sex}</option>
      {/each}
    </select>
    {#if errorMap.sex}
      <p class="error-message">Please select an option</p>
    {/if}
    <label for="gender" class="form-label">Gender</label>
    <select
      name="gender"
      id="gender"
      class={`form-input ${errorMap.gender ? "input-error" : ""}`}
    >
      <option value="">Select One</option>
      {#each GENDERS as gender}
        <option value={gender}>{gender}</option>
      {/each}
    </select>
    {#if errorMap.gender}
      <p class="error-message">Please select an option</p>
    {/if}
  </div>
</div>
