import React, { useState, useEffect } from "react";

function DevForm({ onSubmit }) {
  const [github_username, setGithubUserName] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithubUserName("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          onChange={e => setGithubUserName(e.target.value)}
          value={github_username}
          name="github_username"
          id="github_username"
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          onChange={e => setTechs(e.target.value)}
          value={techs}
          name="techs"
          id="techs"
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            onChange={e => setLatitude(e.target.value)}
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            onChange={e => setLongitude(e.target.value)}
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm