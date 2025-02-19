import type { UserAdminI } from "../../types/TeamProfile";
import useTheme from "../../utils/useTheme";
import "./../../styles/teamProfile.css";
import { useState } from "react";
import { useEffect } from "react";

export default function TeamProfile() {
	const { theme } = useTheme();

	const [users, setUsers] = useState<UserAdminI[]>([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/teamProfil`)
			.then((response) => response.json())
			.then((data) => setUsers(data));
	}, []);

	return (
		<main>
			<header className="top-title">
				<h1>What’s DevTube ?</h1>
				<p className="top-paragraph">
					Bienvenue sur DevTub, votre nouvelle plateforme d'apprentissage dédiée
					à la programmation ! Si vous êtes un débutant et souhaitez plonger
					dans l'univers du développement web, vous êtes au bon endroit. DevTub
					vous propose des ressources claires et accessibles pour apprendre les
					bases du JavaScript, React, HTML, et CSS. Que vous soyez complètement
					novice ou que vous ayez déjà une idée de ce qu'est la programmation,
					nos tutoriels sont conçus pour vous guider pas à pas,
				</p>
			</header>

			<div className="all-of-the-cards">
				{users.map((el) => (
					<section className="content" key={el.id}>
						<div>
							<aside className="back-of-img">
								<img
									className="profile-img"
									src={`${import.meta.env.VITE_API_URL}/${el.profil_img}`}
									alt="profile"
								/>
							</aside>
						</div>

						<section className="team-cards">
							<div className="team-info">
								<h3>
									{el.firstname}
									{el.lastname}
								</h3>
							</div>

							<article className="team-profile-icon">
								<h3>Level...{el.level}</h3>
								<div>
									<a
										href={el.github_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{" "}
										<img
											src={
												theme ? "github-for-light-theme.png" : "github-icon.png"
											}
											alt="github-icon"
										/>
									</a>
									<a
										href={el.linkedin_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={
												theme
													? "linkedin-for-light-theme.png"
													: "linkedin-1121.png"
											}
											alt="linkedin-icon"
										/>
									</a>
								</div>
							</article>

							<div className="profile-content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Facilis, repellat! Veniam, esse ipsam sit modi consequuntur
									rem harum doloremque illum mollitia illo, omnis at quod
									voluptatibus iste officiis totam laborum.
								</p>
							</div>
						</section>
					</section>
				))}
			</div>
		</main>
	);
}
