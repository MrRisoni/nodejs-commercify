--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2020-12-22 20:31:51 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16386)
-- Name: languages; Type: TABLE; Schema: public; Owner: ecommerce
--

CREATE TABLE public.languages (
    id bigint NOT NULL,
    title character varying(55) NOT NULL
);


ALTER TABLE public.languages OWNER TO ecommerce;

--
-- TOC entry 3958 (class 0 OID 16386)
-- Dependencies: 202
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: ecommerce
--

COPY public.languages (id, title) FROM stdin;
\.


--
-- TOC entry 3829 (class 2606 OID 16390)
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- TOC entry 3831 (class 2606 OID 16392)
-- Name: languages unique_lang; Type: CONSTRAINT; Schema: public; Owner: ecommerce
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT unique_lang UNIQUE (title);


-- Completed on 2020-12-22 20:31:51 EET

--
-- PostgreSQL database dump complete
--

