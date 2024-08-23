import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
    const cube = useRef();

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2;
    });

    const hamburger = useGLTF("./hamburger.glb");

    const eventHandler = () => {
        cube.current.material.color.set(
            `hsl(${Math.random() * 360}, 100%, 75%)`
        );
    };

    const stopSphereEventPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <mesh onClick={stopSphereEventPropagation} position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh
                ref={cube}
                position-x={2}
                scale={1.5}
                onClick={eventHandler}
                onContextMenu={() =>
                    console.log(
                        "this is an event regarding the context menu, which can be opened with a right click or on mobile with a long press"
                    )
                }
                onDoubleClick={() => console.log("self explanatory")}
                onPointerOver={() =>
                    console.log(
                        "ONLY in R3F this event is the same as onPointerEnter"
                    )
                }
                onPointerEnter={() => {
                    document.body.style.cursor = "pointer";
                    console.log(
                        "in native javascript, there is a difference between these 2 events"
                    );
                }}
                onPointerLeave={() => {
                    document.body.style.cursor = "default";
                    console.log("when the pointer leaves the object");
                }}
                onPointerMissed={() =>
                    console.log(
                        "triggered when user clicks outside of the listening object, useful when we wnat to know when the user clicks away"
                    )
                }
            >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <primitive
                onClick={(e) => {
                    // This way the on click won't be triggered for each burger component, but only for the one you're clicking on (such as the cheese or the top bun ecc)
                    e.stopPropagation();
                }}
                object={hamburger.scene}
                scale={0.25}
                position-y={0.5}
            />
        </>
    );
}
