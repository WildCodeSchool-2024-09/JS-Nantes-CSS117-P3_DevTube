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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat
					assumenda mollitia aliquam laborum, cum dicta, facilis iste blanditiis
					possimus sapiente sequi? Eos eaque deleniti inventore sit itaque
					perferendis a pariatur recusandae, temporibus cum, illo cumque soluta
					nobis odio iusto laudantium fugiat ducimus dolorum rerum aperiam! Illo
					eligendi ratione fugit distinctio voluptatibus mollitia magnam harum
					tenetur sunt non aspernatur omnis suscipit, id rerum ipsam deleniti,
					obcaecati, at sint! Blanditiis velit quam nulla molestias possimus
					incidunt nihil quod! Voluptates, facilis. Nam!
				</p>
			</header>

			<div className="all-of-the-cards">
				{users.map((el) => (
					<div className="content" key={el.id}>
						<div>
							<div className="back-of-img">
								<img
									className="profile-img"
									src={`${import.meta.env.VITE_API_URL}/${el.profil_img}`}
									alt="profile"
								/>
							</div>
						</div>

						<section className="team-cards">
							<div className="team-info">
								<h3>{el.firstname}</h3>
								<h3>{el.lastname}</h3>
							</div>

							<article className="team-profile-icon">
								<h3>Level...{el.level}</h3>
								<div>
									<a
										href={el.github_url}
										target="_blank"
										rel="noopener noreferrer"
									>
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
					</div>
				))}
			</div>
		</main>
	);
}
